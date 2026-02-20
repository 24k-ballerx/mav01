from django.urls import path, include
from rest_framework import routers
from . import views
from portal.api_urls import router as portal_router

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('health/', views.health_check),
    path('analytics/', views.analytics_summary),
    path('portal/', include((portal_router.urls, 'portal'))),
]
