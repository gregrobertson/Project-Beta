import json
from .models import Technician, Service
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.

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


