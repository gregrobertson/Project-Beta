from django.urls import path
from .views import api_list_technician, api_detail_technician, api_list_service, api_detail_service, api_history_service


urlpatterns = [
    path("technician/", api_list_technician, name="api_list_technician"),
    path("technician/<int:pk>", api_detail_technician, name="api_detail_technician"),
    path("service/", api_list_service, name="api_list_service"),
    path("service/<int:pk>/", api_detail_service, name="api_detail_service"),
    path("service/history", api_history_service, name="api_history_service"),

]
