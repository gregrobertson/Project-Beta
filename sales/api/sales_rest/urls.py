from django.urls import path
from .views import (
    list_sales,
    list_salesperson,
    list_customer,
    delete_customer,
    delete_salesperson,
    )

urlpatterns = [
    path("sales/", list_sales, name="list_sales"),    
    path("salespersons/", list_salesperson, name="list_salespersons"),
    path("salespersons/<int:pk>/", delete_salesperson, name="delete_salesperson"),
    path("customers/", list_customer, name="list_customer"),    
    path('customers/<int:pk>/', delete_customer, name="delete_customer"),       
]
