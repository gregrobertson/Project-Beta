from django.urls import path
from .views import api_list_technician, api_detail_technician, api_list_service


urlpatterns = [
    path("technician/", api_list_technician, name="api_list_technician"),
    path("technician/<int:pk>", api_detail_technician, name="api_detail_technician"),
    path("service/", api_list_service, name="api_list_service"),
]
