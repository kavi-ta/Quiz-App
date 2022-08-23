from django.shortcuts import render
from .serializers import QuizSerializer,QuestionSerializer,QuizIdSerializer
from rest_framework import generics 
from rest_framework.response import Response
from .models import Quizzes, Question
from rest_framework.views import APIView

class Quiz(generics.ListAPIView):
    serializer_class = QuizSerializer
    queryset = Quizzes.objects.all()

class QuizIds(generics.ListAPIView):
    serializer_class = QuizIdSerializer
    queryset = Quizzes.objects.all()

class QuizQuestion(APIView):
    # get req
    def get(self, request, format=None, **kwargs):
        question = Question.objects.filter(quiz__id = kwargs['topic'])
        serializer = QuestionSerializer(question, many = True)
        return Response(serializer.data)
