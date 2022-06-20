from base64 import encode
import json
from .models import AutomobileVO, Technician, Service
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    porperties = [

    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_number",
    ]

class ServiceEncoder(ModelEncoder):
    model = Service
    properties = [
        "id",
        "vin",
        "customer",
        "date_time",
        "reason",
        "technician",
        "is_vip",
    ]

    encoders = {
        "technician":TechnicianEncoder()
        }

@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {"technician": technician},
            encoder = TechnicianEncoder,
        )
    else:
       content = json.loads(request.body)
       print(content) 
       technician = Technician.objects.create(**content)
       return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
@require_http_methods(["DELETE","PUT"])
def api_detail_technician(request, pk):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        print(content)
        technician = Technician.objects.filter(id=pk).update(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_service(request):
    if request.method == "GET":
       service = Service.objects.all()
       return JsonResponse(
        service,
        encoder=ServiceEncoder,
        safe=False
       ) 
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(employee_number=content["name"])
            content["name"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Employee Doesn't Exist"},
                status=400,
            )
        service = Service.objects.create(**content)
        return JsonResponse(
            service,
            encoder=ServiceEncoder,
            safe=False
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_detail_service(request, pk):
    if request.method == "GET":
        service = Service.objects.get(id=pk)
        return JsonResponse(
            service,
            encoder=ServiceEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Service.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "vin" in content:
                vin = AutomobileVO.objects.get(vin=content["vin"])
                content["vin"] = vin
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid VIN"},
                status=400,
            )
        Service.objects.filter(id=pk).update(**content)
        service = Service.objects.get(id=pk)
        return JsonResponse(
            service,
            encoder=ServiceEncoder,
            safe=False,
        )    
