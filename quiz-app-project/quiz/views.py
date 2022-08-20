from django.shortcuts import render
from .serializers import QuizSerializer,RandomQuestionSerializer,QuestionSerializer
from rest_framework import generics 
from rest_framework.response import Response
from .models import Quizzes, Question
from rest_framework.views import APIView

class Quiz(generics.ListAPIView):
    serializer_class = QuizSerializer
    queryset = Quizzes.objects.all()

class RandomQuestion(APIView):
    # get req
    def get(self, request, format=None, **kwargs):
        question = Question.objects.filter(quiz__title = kwargs['topic']).order_by('?')[:1]
        serializer = RandomQuestionSerializer(question, many = True)
        return Response(serializer.data)

class QuizQuestion(APIView):
    # get req
    def get(self, request, format=None, **kwargs):
        question = Question.objects.filter(quiz__id = kwargs['topic'])
        serializer = QuestionSerializer(question, many = True)
        return Response(serializer.data)