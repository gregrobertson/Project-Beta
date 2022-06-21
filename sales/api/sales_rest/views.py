from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import AutomobileVO, Customer, SalesPerson, SalesHistory
import json

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin']


class CustomerListEnconder(ModelEncoder):
    model = Customer
    properties = [
        'name',
        'address',
        'phone_number',
        'id',
    ]


class SalesPersonListEnconder(ModelEncoder):
    model = SalesPerson
    properties = [
        'name',
        'employee_number',
        'id'
    ]


class SalesHistoryListEncoder(ModelEncoder):
    model = SalesHistory
    properties = [
        "automobile",
        "sales_person",
        "customer",
        "price",        
    ]

    def get_extra_data(self, o):
        return {
            "automobile": o.automobile.vin,
            "sales_person": {
                 "name" :o.sales_person.name,
                 "emp_no":o.sales_person.employee_number,
            },
            "customer": o.customer.name
        } 

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonListEnconder(),
        "customer": CustomerListEnconder(),
    }


class SalesHistoryDetailEncoder(ModelEncoder):
    model = SalesHistory
    properties = [
        "automobile",
        "sales_person",
        "customer",
        "price",
    ]        

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonListEnconder(),
        "customer": CustomerListEnconder(),
    }
    


@require_http_methods(["GET", "POST"])
def list_salesperson(request):    
    if request.method == "GET":
        salespersons = SalesPerson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalesPersonListEnconder,
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson = SalesPerson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonListEnconder,
                safe=False
            )
        except:
            return JsonResponse(
                {"message": "Use another employee number."}
            )

@require_http_methods(["DELETE"])
def delete_salesperson(request, pk):
    try:
        salesperson = SalesPerson.objects.get(id=pk)
        salesperson.delete()
        return JsonResponse(
          salesperson,
          encoder=SalesPersonListEnconder,
          safe=False,
        )
    except SalesPerson.DoesNotExist:
        return JsonResponse({"message": "Salesperson does not exist"})





@require_http_methods(["GET", "POST"])
def list_customer(request):    
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEnconder,
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerListEnconder,
                safe=False
            )
        except:
            return JsonResponse(
                {"message": "Use another customer."}
            )

@require_http_methods(["DELETE"])
def delete_customer(request, pk):
    try:
        customer = Customer.objects.get(id=pk)
        customer.delete()
        return JsonResponse(
          customer,
          encoder=CustomerListEnconder,
          safe=False,
        )
    except Customer.DoesNotExist:
        return JsonResponse({"message": "Customer does not exist"})




@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = SalesHistory.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesHistoryListEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)


        try:
            auto_vin = content["automobile"]
            auto = AutomobileVO.objects.get(vin=auto_vin)
            content["automobile"] = auto
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile not in system"},
                status=400,
            )

        try:
            salesperson_name = content["sales_person"]
            salesperson = SalesPerson.objects.get(name=salesperson_name)
            content["sales_person"] = salesperson
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson not in system"},
                status=400,
            )

        try:
            pot_customer = content["customer"]
            customer = Customer.objects.get(name=pot_customer)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400,
            )
        
        sales = SalesHistory.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SalesHistoryDetailEncoder,
            safe=False,
        )




@require_http_methods(["DELETE", "GET", "PUT"])
def show_sale(request, pk):
    if request.method == "GET":
        try:        
            sales = SalesHistory.objects.get(id=pk)
            return JsonResponse(
                sales,
                encoder=SalesHistoryDetailEncoder,
                safe=False,
            )
        except SalesHistory.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sales history"},
                status=400,
            )
    elif request.method == "DELETE":
        count, _ = SalesHistory.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})        
    else:

        try:
            salesperson_name = content["sales_person"]
            salesperson = SalesPerson.objects.get(name=salesperson_name)
            content["sales_person"] = salesperson
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson not in system"},
                status=400,
            )
        try:
            pot_customer = content["customer"]
            customer = Customer.objects.get(name=pot_customer)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400,
            )
        
        content = json.loads(request.body)
        SalesHistory.objects.filter(id=pk).update(**content)
        sale = SalesHistory.objects.get(id=pk)
        return JsonResponse(
            sale,
            encoder=SalesHistoryDetailEncoder,
            safe=False,
        )


# Create your views here.
