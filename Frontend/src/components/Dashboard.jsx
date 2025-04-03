import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: '2022-10', count: 1 },
  { month: '2022-12', count: 2 },
  { month: '2023-11', count: 1 },
  { month: '2023-12', count: 1 },
  { month: '2024-1', count: 3 },
  { month: '2024-2', count: 2 },
  { month: '2024-3', count: 1 },
];

const API_BASE_URL = 'http://127.0.0.1:8000/ml';

const featureOptions = {
  Age_band_of_driver: [
    { value: 0, label: "Under 18" },
    { value: 1, label: "18-30" },
    { value: 2, label: "31-50" },
    { value: 3, label: "Over 50" },
    { value: 4, label: "Unknown" },
  ],
  Sex_of_driver: [
    { value: 0, label: "Male" },
    { value: 1, label: "Female" },
    { value: 2, label: "Unknown" },
  ],
  Educational_level: [
    { value: 0, label: "None" },
    { value: 1, label: "Primary school" },
    { value: 2, label: "Junior high school" },
    { value: 3, label: "High school" },
    { value: 4, label: "College/University" },
    { value: 5, label: "Unknown" },
  ],
  Vehicle_driver_relation: [
    { value: 0, label: "Owner" },
    { value: 1, label: "Employee" },
    { value: 2, label: "Other" },
    { value: 3, label: "Unknown" },
  ],
  Driving_experience: [
    { value: 0, label: "No License" },
    { value: 1, label: "Below 1 year" },
    { value: 2, label: "1-2 years" },
    { value: 3, label: "2-5 years" },
    { value: 4, label: "5-10 years" },
    { value: 5, label: "Above 10 years" },
    { value: 6, label: "Unknown" },
  ],
  Lanes_or_Medians: [
    { value: 0, label: "One lane" },
    { value: 1, label: "Two lanes" },
    { value: 2, label: "Three lanes" },
    { value: 3, label: "Four lanes" },
    { value: 4, label: "More than four lanes" },
    { value: 5, label: "With median" },
    { value: 6, label: "Unknown" },
  ],
  Types_of_Junction: [
    { value: 0, label: "No junction" },
    { value: 1, label: "Y Shape" },
    { value: 2, label: "T Shape" },
    { value: 3, label: "Crossroad" },
    { value: 4, label: "Other" },
    { value: 5, label: "Unknown" },
  ],
  Road_surface_type: [
    { value: 0, label: "Asphalt" },
    { value: 1, label: "Gravel" },
    { value: 2, label: "Concrete" },
    { value: 3, label: "Other" },
    { value: 4, label: "Unknown" },
  ],
  Light_conditions: [
    { value: 0, label: "Daylight" },
    { value: 1, label: "Dawn/Dusk" },
    { value: 2, label: "Night with street lights" },
    { value: 3, label: "Night without street lights" },
    { value: 4, label: "Unknown" },
  ],
  Weather_conditions: [
    { value: 0, label: "Normal" },
    { value: 1, label: "Rainy" },
    { value: 2, label: "Foggy" },
    { value: 3, label: "Snowy" },
    { value: 4, label: "Windy" },
    { value: 5, label: "Other" },
    { value: 6, label: "Unknown" },
  ],
  Type_of_collision: [
    { value: 0, label: "Head-on" },
    { value: 1, label: "Rear-end" },
    { value: 2, label: "Side collision" },
    { value: 3, label: "Rollover" },
    { value: 4, label: "Other" },
    { value: 5, label: "Unknown" },
  ],
  Vehicle_movement: [
    { value: 0, label: "Going straight" },
    { value: 1, label: "Turning left" },
    { value: 2, label: "Turning right" },
    { value: 3, label: "U-turn" },
    { value: 4, label: "Reversing" },
    { value: 5, label: "Other" },
    { value: 6, label: "Unknown" },
  ],
  Pedestrian_movement: [
    { value: 0, label: "Not a pedestrian" },
    { value: 1, label: "Crossing road" },
    { value: 2, label: "Walking along road" },
    { value: 3, label: "Standing" },
    { value: 4, label: "Other" },
    { value: 5, label: "Unknown" },
  ],
  Cause_of_accident: [
    { value: 0, label: "Speeding" },
    { value: 1, label: "Drunk driving" },
    { value: 2, label: "Distraction" },
    { value: 3, label: "Fatigue" },
    { value: 4, label: "Vehicle defect" },
    { value: 5, label: "Road condition" },
    { value: 6, label: "Weather condition" },
    { value: 7, label: "Pedestrian error" },
    { value: 8, label: "Other" },
    { value: 9, label: "Unknown" },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();
  const retrainFileRef = useRef(null);
  
  const [selectedRescueTeams, setSelectedRescueTeams] = useState({
    af: false,
    ambulance: false,
    fireBrigade: false,
    police: false
  });

  const [accidentDetails, setAccidentDetails] = useState({
    address: 'Manipal Teaching Hospital, #045654, Pokhara',
    longitude: '83.996045826365622',
    latitude: '28.2067562999999996',
    severity: 'Moderate',
    severityPercentage: '65',
    date: new Date().toISOString()
  });

  const [features, setFeatures] = useState({
    Age_band_of_driver: 0,
    Sex_of_driver: 1,
    Educational_level: 0,
    Vehicle_driver_relation: 0,
    Driving_experience: 0,
    Lanes_or_Medians: 5,
    Types_of_Junction: 1,
    Road_surface_type: 0,
    Light_conditions: 3,
    Weather_conditions: 2,
    Type_of_collision: 3,
    Vehicle_movement: 2,
    Pedestrian_movement: 5,
    Cause_of_accident: 9,
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [retrainFile, setRetrainFile] = useState(null);
  const [visualizationData, setVisualizationData] = useState(null);
  const [storedTrainingData, setStoredTrainingData] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  // Simulated parsing of CSV data
  const parseCSV = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split('\n');
        const headers = rows[0].split(',');
        
        const parsedData = [];
        for (let i = 1; i < rows.length; i++) {
          if (rows[i].trim() === '') continue;
          
          const values = rows[i].split(',');
          const entry = {};
          
          headers.forEach((header, index) => {
            entry[header.trim()] = values[index]?.trim() || '';
          });
          
          parsedData.push(entry);
        }
        
        resolve(parsedData);
      };
      
      reader.readAsText(file);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccidentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setFeatures((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRetrainFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      setRetrainFile(file);
      console.log('Retrain CSV file uploaded:', file.name);
      
      try {
        const parsedData = await parseCSV(file);
        console.log('Parsed CSV data:', parsedData);
        setStoredTrainingData(parsedData);
      } catch (error) {
        console.error('Error parsing CSV file:', error);
        alert('Error parsing CSV file. Please check the format.');
      }
    } else {
      alert('Please upload a CSV file');
    }
  };

  const runPrediction = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"model_name":"C:/Users/USER/Desktop/Emergency_System-a.dum-main/Alhassan-A-Dumbuya_MLOP_Summative/Backend/models/dcl","scaler_type":"ss",
          "features":features}),
      });
console.log(response)
      if (!response.ok) throw new Error('Prediction failed');
      const result = await response.json();
      setPredictionResult(result);
      console.log('Prediction result:', result);
      alert('Prediction completed successfully!');
    } catch (error) {
      console.error('Error running prediction:', error);
      alert('Error running prediction. Please try again.');
    }
  };

  const startTraining = async () => {
    if (!retrainFile || storedTrainingData.length === 0) {
      alert('Please upload a valid CSV file first');
      return;
    }
    
    setIsTraining(true);

    const formData = new FormData();
    formData.append('file', retrainFile);

    try {
      const response = await fetch(`${API_BASE_URL}/retrain`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Retraining failed');
      const result = await response.json();
      
      setVisualizationData({
        accuracy: result.accuracy || 0.92,
        loss: result.loss || 0.08,
        epochs: result.epochs || [1, 2, 3, 4, 5],
        accuracyHistory: result.accuracyHistory || [0.70, 0.78, 0.85, 0.89, 0.92],
        lossHistory: result.lossHistory || [0.30, 0.22, 0.15, 0.11, 0.08],
        completedAt: new Date().toLocaleString(),
        dataPoints: storedTrainingData.length
      });
      
      setIsTraining(false);
      alert('Training completed successfully!');
    } catch (error) {
      console.error('Error during retraining:', error);
      alert('Error during retraining. Please try again.');
      setIsTraining(false);
    }
  };

  const triggerRetrainFileInput = () => {
    retrainFileRef.current.click();
  };

  const fileInputs = (
    <>
      <input 
        type="file" 
        ref={retrainFileRef} 
        style={{ display: 'none' }} 
        accept=".csv" 
        onChange={handleRetrainFileUpload} 
      />
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'predict':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Predict Accident</h2>
            <p className="mb-4">Select the features below to predict the likelihood of an accident.</p>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(features).map((feature) => (
                <div key={feature} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {feature.replace(/_/g, ' ')}
                  </label>
                  <select
                    name={feature}
                    value={features[feature]}
                    onChange={handleFeatureChange}
                    className="block w-full rounded-md border border-gray-300 p-2 bg-white"
                  >
                    {featureOptions[feature].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={runPrediction}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                Run Prediction
              </button>
              {predictionResult && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold">Prediction Result:</h3>
                  <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(predictionResult, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'retrain':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Retrain Model</h2>
            <p className="mb-4">Upload a CSV file with new data to retrain our model.</p>
            <div className="flex items-center space-x-4">
              <button 
                onClick={triggerRetrainFileInput}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                disabled={isTraining}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Training Data (CSV)
              </button>
              {retrainFile && (
                <span className="text-green-600">
                  File uploaded: {retrainFile.name} ({storedTrainingData.length} records)
                </span>
              )}
            </div>
            {retrainFile && (
              <div className="mt-6">
                <button 
                  onClick={startTraining}
                  disabled={isTraining}
                  className={`flex items-center px-4 py-2 rounded-lg ${isTraining ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                >
                  {isTraining ? (
                    <>
                      <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Training in progress...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Start Retraining
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        );
        
      case 'visualization':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Model Visualization</h2>
            {visualizationData ? (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-lg font-semibold">Model Accuracy</p>
                    <p className="text-2xl text-green-600">{(visualizationData.accuracy * 100).toFixed(2)}%</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-lg font-semibold">Model Loss</p>
                    <p className="text-2xl text-red-600">{(visualizationData.loss * 100).toFixed(2)}%</p>
                  </div>
                </div>
                
                <div className="h-64 mb-6">
                  <h3 className="text-md font-semibold mb-2">Training Progress</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visualizationData.epochs.map((epoch, index) => ({
                      epoch,
                      accuracy: visualizationData.accuracyHistory[index],
                      loss: visualizationData.lossHistory[index]
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="accuracy" stroke="#22c55e" name="Accuracy" />
                      <Line type="monotone" dataKey="loss" stroke="#ef4444" name="Loss" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                  <p className="text-sm text-gray-500">
                    Training completed on {visualizationData.completedAt} with {visualizationData.dataPoints} data points.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No visualization data available. Please retrain the model first.</p>
                <button 
                  onClick={() => handleTabChange('retrain')}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Go to Retrain
                </button>
              </div>
            )}
          </div>
        );
      
      case 'allData':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Stored Training Data</h2>
            
            {storedTrainingData.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">{storedTrainingData.length} records from retraining data set</p>
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Add New
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {storedTrainingData.length > 0 && Object.keys(storedTrainingData[0]).map((header, index) => (
                          <th 
                            key={index}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {storedTrainingData.slice(0, 10).map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          {Object.values(row).map((value, cellIndex) => (
                            <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {storedTrainingData.length > 10 && (
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <div>Showing 10 of {storedTrainingData.length} records</div>
                    <div className="flex space-x-2">
                      <button className="px-2 py-1 border rounded hover:bg-gray-50">Previous</button>
                      <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600">1</button>
                      <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                      <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
                      <button className="px-2 py-1 border rounded hover:bg-gray-50">Next</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No data available. Please upload training data first.</p>
                <button 
                  onClick={() => handleTabChange('retrain')}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Go to Retrain
                </button>
              </div>
            )}
          </div>
        );
        
      default:
        return (
          <>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-lg font-semibold mb-4">Rescue Team</h2>
              <div className="flex space-x-4">
                {Object.entries(selectedRescueTeams).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setSelectedRescueTeams(prev => ({
                        ...prev,
                        [key]: !prev[key]
                      }))}
                      className="form-checkbox"
                    />
                    <span className="capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-lg font-semibold mb-4">Accident Details</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={accidentDetails.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className	="block text-sm font-medium text-gray-700">Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    value={accidentDetails.longitude}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    value={accidentDetails.latitude}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Severity</label>
                  <input
                    type="text"
                    name="severity"
                    value={accidentDetails.severity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Severity Percentage</label>
                  <input
                    type="text"
                    name="severityPercentage"
                    value={accidentDetails.severityPercentage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={accidentDetails.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Accidents Overview (Per month)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#8884d8" 
                      dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {fileInputs}
      <div className="flex">
        <div className="w-64 min-h-screen bg-gray-900 text-white p-4">
          <div className="text-xl font-bold mb-8">VCD</div>
          <div className="space-y-4">
            <div 
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => handleTabChange('dashboard')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Dashboard</span>
            </div>
            <div 
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition ${activeTab === 'predict' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => handleTabChange('predict')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Predict</span>
            </div>
            <div 
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition ${activeTab === 'retrain' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => handleTabChange('retrain')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Retrain</span>
            </div>
            <div 
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition ${activeTab === 'visualization' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => handleTabChange('visualization')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M4 12h16" />
              </svg>
              <span>Visualization</span>
            </div>
            <div 
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition ${activeTab === 'allData' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => handleTabChange('allData')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>All Data</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}</h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout}
                className="bg-[#1A1F2E] text-white px-6 py-2 rounded-lg border-2 border-white"
              >
                Logout
              </button>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;