from preprocessing import * 

#retraining
def retrained(train,label,test,test_label,classes,typ_,model_name,scaler_type,analysis_type):
    model = retrain(typ_=typ_,model_name=model_name,train=train,label=label)
    preds = model.predict(test)
    #evaluation
    metrics = model_analysis(true_labels=test_label,predicted_labels=preds,classes=classes,typ_=analysis_type) 
    return metrics

def process(loader_type,train,label,train_column_limit,data_type,scaler_type,test_ratio=0.3):
    train = loader(loader_type,train,axis=0,drop_index=True)
    
    #convert objects to int
    train = covert_objects_to_int(train)
    
    #column and label selection
    label = select_label_column(train,label)
    train,columns = select_train_columns(train,train_column_limit)
    
    
    #spilting
    train_x,test_x,label_x,test_y = data_spliter(train,label,random_state=2,test_size=test_ratio)

    #saving training and testing data
    write_data(data_type,train_x,"training")
    write_data(data_type,test_x,"test")

    #scaling
    scaled_train_x = scalers(scaler_type,train_x)
    scaled_test_x = scalers(scaler_type,test_x)
    return scaled_train_x,scaled_test_x,label_x,test_y




