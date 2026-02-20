from rest_framework import routers
from .views import SubjectViewSet, SchoolClassViewSet, StudentProfileViewSet, ResultViewSet

router = routers.DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'classes', SchoolClassViewSet)
router.register(r'students', StudentProfileViewSet)
router.register(r'results', ResultViewSet)

urlpatterns = router.urls
