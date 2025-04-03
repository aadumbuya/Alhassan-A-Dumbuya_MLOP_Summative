from django.shortcuts import render

from .retraining import *
from .model import *
from .prediction import *
from rest_framework.response import Response
from rest_framework.decorators import api_view



{"attrs":{"loader_type":"one","data_type":"csv","scaler_type":"ss","model_name":"dcl_model","model_type":"dcl","analysis_type":"default","train_column_limit":-1,"classes":"0,1,2","label":"Accident_severity","test_ratio":""},
"csv_file":{}}




{"attrs":{"loader_type":"one","data_type":"csv","scaler_type":"ss","model_name":"dcl_model","model_type":"dcl","analysis_type":"default","train_column_limit":-1,"classes":"0,1,2","label":"Accident_severity","test_ratio":0.3}
,"csv_path":"C:/Users/USER/Desktop/Emergency_System-a.dum-main/Alhassan-A-Dumbuya_MLOP_Summative/Backend/data/train/cleaned.csv"}

def convert_list(val):
    val = val.split(",")
    in_val = []
    for i in val:
        in_val.append(int(i))
    return in_val 

# Create your views here.
def trainmodel(data):
    attrs = data["attrs"]
    training_data = data["train"]
    response = model(loader_type=attrs["loader_type"],data=training_data,data_type=attrs["data_type"],scaler_type=attrs["scaler_type"],model_name=attrs["model_name"],model_type=attrs["model_type"],analysis_type=attrs["analysis_type"],train_column_limit=attrs["train_column_limit"],classes=convert_list(attrs["classes"]),label=attrs["label"],test_ratio=attrs["test_ratio"])
    return Response(response,status=200)

@api_view(['POST'])
def trainModel(request):
    data = request.data
    if request.method == 'POST':
        if request.FILES.get('csv_file',None) is not None:
            csv_file = request.FILES['csv_file']
            # Read the uploaded CSV file
            decoded_file = csv_file.read().decode('utf-8').splitlines()
            data["train"] = decoded_file
        else:
            data["train"] = read_from_file_or_data(sect="file",typ_="csv",name=request.data["csv_path"],sep=",") 
    else:
        return Response({"error":"invalid request"},status=406)
    response = trainmodel(data)
    return response


{"attrs":{"loader_type":"one","data_type":"csv","scaler_type":"ss","model_name":"dcl_model","model_type":"dcl","analysis_type":"default","train_column_limit":-1,
"classes":"0,1,2","label":"Accident_severity","typ_":"only_new","test_ratio":0.3},"csv_file":{}}



{"attrs":{"loader_type":"one","data_type":"csv","scaler_type":"ss","model_name":"dcl_model","model_type":"dcl","analysis_type":"default","train_column_limit":-1,
"classes":"0,1,2","label":"Accident_severity","typ_":"only_new","test_ratio":0.3},
"csv_path":"C:/Users/USER/Desktop/Emergency_System-a.dum-main/Alhassan-A-Dumbuya_MLOP_Summative/Backend/data/train/cleaned.csv"}



def retrainmodel(data):
    attrs = data["attrs"]
    train = data["train"]
    scaled_train_x,scaled_test_x,label_x,test_y = process(loader_type=attrs["loader_type"],train=train,label=attrs["label"],train_column_limit=attrs["train_column_limit"],scaler_type=attrs["scaler_type"],data_type=attrs["data_type"],test_ratio=attrs["test_ratio"])
    response = retrained(train=scaled_train_x,label=label_x,test=scaled_test_x,test_label=test_y,classes=convert_list(attrs["classes"]),typ_=attrs["typ_"],model_name=attrs["model_name"],scaler_type=attrs["scaler_type"],analysis_type=attrs["analysis_type"])
    return Response(response,status=200)

@api_view(['POST'])
def retrainModel(request):
    data = request.data
    if request.method == 'POST':
        if request.FILES.get('csv_file',None) is not None:
            csv_file = request.FILES['csv_file']
            # Read the uploaded CSV file
            decoded_file = csv_file.read().decode('utf-8').splitlines()
            data["train"] = decoded_file
        else:
            data["train"] = read_from_file_or_data(sect="file",typ_="csv",name=request.data["csv_path"],sep=",") 
    else:
        return Response({"error":"invalid request"},status=406)
    response = retrainmodel(data)
    return response


{"model_name":"C:/Users/USER/Desktop/Emergency_System-a.dum-main/Alhassan-A-Dumbuya_MLOP_Summative/Backend/models/dcl","scaler_type":"ss",
"features":{"Age_band_of_driver":0,"Sex_of_driver":1,"Educational_level":0,"Vehicle_driver_relation":0,"Driving_experience":0,"Lanes_or_Medians":5,"Types_of_Junction":1,"Road_surface_type":0,"Light_conditions":3,"Weather_conditions":2,"Type_of_collision":3,
"Vehicle_movement":2,"Pedestrian_movement":5,"Cause_of_accident":9}}


def predicting(request):
    #attrs = request.GET.dict()
    attrs = request.data
    response = prediction(data=attrs["features"],model_name=attrs["model_name"],scaler_type=attrs["scaler_type"])
    return Response({"result":response},status=200)

@api_view(['POST'])
def Predicting(request):
    response = predicting(request)
    return response



