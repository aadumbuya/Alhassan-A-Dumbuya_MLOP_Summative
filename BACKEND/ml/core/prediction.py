from .preprocessing import * 


#"C:\Users\DIVINE\Desktop\assignment\models\dcl_model.pkl"

#prediction
def prediction(data,model_name,scaler_type):
    data = pd.DataFrame(data,index=[0])
    data = covert_objects_to_int(data)
    data = scalers(scaler_type,data)
    preds = predict(model_name,data)
    return preds


