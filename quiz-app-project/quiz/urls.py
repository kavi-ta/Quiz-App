from django.urls import path
from .views import Quiz, QuizIds, QuizQuestion

app_name = 'quiz'

urlpatterns = [
    path('',Quiz.as_view()),
    path('qids/',QuizIds.as_view()),
    path('q/<str:topic>/',QuizQuestion.as_view()),
    

    ]