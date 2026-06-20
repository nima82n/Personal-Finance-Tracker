from django.shortcuts import render
from .forms import RegistrationForm
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse, reverse_lazy
from django.contrib.auth.views import LoginView
from django.contrib.auth import logout
from .models import *
import requests
import json
from django.conf import settings

# Create your views here.


def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))
    categories = Category.objects.all()
    
    return render(request, 'finance/index.html', {
        'categories': categories,
    })


def register(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('index'))
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
        return HttpResponseRedirect(reverse('index'))
    return render(request, 'finance/register.html', {
        'form': RegistrationForm,
    })


class Login(LoginView):
    template_name = 'finance/login.html'
    
    
    def get_success_url(self):
        return reverse_lazy('index')


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))


def transaction(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'request method should be Put'})
    
    user = request.user
    data = json.loads(request.body)
    try:
        amount = float(data['amount'])
        if data['dorw'] == 'withdraw':
            dorw = False
        elif data['dorw'] == 'deposit':
            dorw = True
        title = data['title']
        category = data['category']
        category = Category.objects.get(name=category)
        u = User.objects.get(pk=user.id)
        if dorw:
            u.balance += amount
        elif not dorw:
            u.balance -= amount
        u.save()
        t = Transaction(user=user, amount=amount, category=category, dorw=dorw, title=title)
        t.save()
        return JsonResponse({'messege': 'Transaction done seccusfully'})
    except TypeError:
        return JsonResponse({'error': 'Please enter the correct data types.'})


def add_category(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Request method should be post.'})
    data = json.loads(request.body)
    if type(data['name']) != str:
        return JsonResponse({'error': 'Category name should be text.'})
    c = Category(name=data['name'])
    c.save()
    return JsonResponse({'messege': 'category added succesfully.'})


def transactions_list(request):
    transactions = Transaction.objects.filter(user=request.user).order_by('-timestamp').all().values()
    return JsonResponse([transaction for transaction in transactions], safe=False)


def categories(request):
    categories = Category.objects.all().values()
    return JsonResponse([category for category in categories], safe=False)


def convert(request):
    return render(request, 'finance/convert.html')


def activity(request):
    return render(request, 'finance/activity.html', {
        'categories': Category.objects.all().values(),
    })


def proxy(request, name):
    response = requests.get(f'https://api.exchangeratesapi.io/v1/{name}', {'access_key': settings.API_KEY})
    return JsonResponse(response.json())