from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('login', views.Login.as_view(), name='login'),
    path('logout', views.logout_view, name='logout'),
    path('convert', views.convert, name='convert'),
    path('activity', views.activity, name='activity'),
    # API
    path('transaction', views.transaction, name='transaction'),
    path('add_category', views.add_category, name='add_category'),
    path('transactions_list', views.transactions_list, name='transactions_list'),
    path('categories', views.categories, name='categories'),
    path('proxy/<str:name>', views.proxy, name='proxy'),
]
