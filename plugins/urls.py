from django.urls import path
from . import views

app_name = "plugins"

urlpatterns = [
    path('new/', views.PluginCreateView.as_view(), name="plugins_create"),
    path('list/all/', views.PluginListView.as_view(), name="plugins_list"),
    path('<int:pk>/', views.PluginDetailView.as_view(), name="plugins_detail"),
    path('update/<int:pk>/', views.PluginUpdateView.as_view(), name="plugins_update"),
    path('delete/<int:pk>/', views.PluginDeleteView.as_view(), name="plugins_delete"),
]