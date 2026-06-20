from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    balance = models.FloatField(default=0)


class Category(models.Model):
    name = models.CharField(max_length=30)
    
    
    def __str__(self):
        return f'{self.name}'


class Transaction(models.Model):
    title = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    amount = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category')
    dorw = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return f'User: {self.user} Amount: {self.amount} Type: {self.dorw}'