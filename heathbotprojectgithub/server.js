const express = require("express");
const cors = require("cors");

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Data ---
const diseases = [
  {
    name: "Varicose veins",
    description:
      "Varicose veins are enlarged, twisted veins that are visible just under the surface of the skin. They usually occur in the legs.",
    symptoms: ["Swelling", "Aching pain", "Heaviness", "Burning or itching", "Discoloration", "Ulcers"],
    tips: ["Exercise regularly", "Wear compression stockings", "Avoid standing for long periods", "Surgical or laser therapy in severe cases"],
  },
  {
    name: "Diabetes mellitus",
    description:
      "A metabolic disease that causes high blood sugar. Symptoms and management vary by type (Type 1, Type 2).",
    symptoms: ["Frequent urination", "Increased thirst", "Fatigue", "Blurred vision"],
    tips: ["Lifestyle changes", "Oral medications", "Insulin therapy"],
  },
  {
    name: "Dengue",
    description:
      "Dengue is a mosquito-borne viral infection causing high fever, severe headache, pain behind the eyes, joint and muscle pain.",
    symptoms: ["High fever", "Severe headache", "Pain behind eyes", "Joint pain", "Rash"],
    tips: ["Supportive care", "Hydration", "Paracetamol for fever (avoid NSAIDs)"],
  },
  {
    name: "Pneumonia",
    description:
      "Infection that inflames air sacs in one or both lungs, which may fill with fluid.",
    symptoms: ["Cough", "Fever", "Shortness of breath", "Chest pain"],
    tips: ["Antibiotics (bacterial)", "Rest", "Fluids", "Hospital care for severe cases"],
  },
  {
    name: "Asthma",
    description:
      "A condition where airways narrow and swell and may produce extra mucus, causing breathing difficulty.",
    symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Coughing"],
    tips: ["Inhalers (bronchodilators)", "Steroid inhalers", "Avoid triggers"],
  },
  {
    name: "Fever",
    description: "A temporary increase in body temperature, often due to an illness.",
    symptoms: ["Elevated body temperature", "Sweating", "Shivering", "Headache", "Muscle aches"],
    tips: ["Rest", "Hydration", "Paracetamol or ibuprofen"],
  },
  {
    name: "Cold",
    description: "A common viral infection of the upper respiratory tract.",
    symptoms: ["Runny or stuffy nose", "Sore throat", "Cough", "Sneezing", "Mild fever"],
    tips: ["Rest", "Fluids", "Over-the-counter cold remedies"],
  },
  {
    name: "Cough",
    description: "A reflex action to clear your airways of mucus and irritants.",
    symptoms: ["Dry or productive cough", "Sore throat", "Shortness of breath"],
    tips: ["Cough suppressants", "Lozenges", "Stay hydrated"],
  },
  {
    name: "Headache",
    description: "Pain or discomfort in the head or face area.",
    symptoms: ["Throbbing or sharp pain", "Pressure sensations", "Sensitivity to light or sound"],
    tips: ["Pain relievers", "Rest", "Hydration"],
  },
  {
    name: "Migraine",
    description:
      "Severe, throbbing headaches often accompanied by nausea, vomiting, and sensitivity to light and sound.",
    symptoms: ["Severe throbbing headache", "Nausea", "Vomiting", "Light sensitivity", "Sound sensitivity", "Visual disturbances"],
    tips: ["Migraine medications (triptans)", "Pain relievers", "Rest in dark room", "Avoid triggers", "Preventive medications"],
  },
  {
    name: "Tension headache",
    description:
      "The most common type of headache, causing steady, aching pain around the head like a tight band.",
    symptoms: ["Steady aching pain", "Pressure around head", "Muscle tension in neck/shoulders", "Mild to moderate intensity"],
    tips: ["Over-the-counter pain relievers", "Stress management", "Regular sleep schedule", "Muscle relaxation techniques"],
  },
  {
    name: "Malaria",
    description:
      "A mosquito-borne parasitic infection causing recurring episodes of fever, chills, and severe headaches.",
    symptoms: ["High fever", "Chills", "Severe headache", "Sweating", "Nausea", "Vomiting", "Muscle aches"],
    tips: ["Antimalarial medications", "Supportive care", "Hospital monitoring", "Prevention with mosquito control"],
  },
  {
    name: "Meningitis",
    description:
      "Infection of the protective membranes covering the brain and spinal cord, causing severe headache and neck stiffness.",
    symptoms: ["Severe headache", "Neck stiffness", "High fever", "Confusion", "Sensitivity to light", "Rash"],
    tips: ["Immediate medical attention", "Antibiotics (bacterial)", "Antiviral medications (viral)", "Supportive care", "Hospital treatment"],
  },
  {
    name: "Sinusitis",
    description:
      "Inflammation of the sinus cavities causing facial pain, pressure, and headaches, especially when bending over.",
    symptoms: ["Facial pain and pressure", "Headache", "Nasal congestion", "Thick nasal discharge", "Reduced sense of smell"],
    tips: ["Nasal decongestants", "Saline rinses", "Pain relievers", "Antibiotics if bacterial", "Steam inhalation"],
  },
  {
    name: "Cluster headache",
    description:
      "Intense, burning pain usually around one eye, occurring in cyclical patterns or clusters.",
    symptoms: ["Intense burning pain around one eye", "Red, watery eye", "Nasal congestion", "Restlessness", "Pain occurs in clusters"],
    tips: ["Oxygen therapy", "Triptans", "Preventive medications", "Avoid alcohol and strong smells", "Regular sleep schedule"],
  },
  {
    name: "Hypertension",
    description:
      "High blood pressure that can cause persistent headaches, especially in the back of the head.",
    symptoms: ["Persistent headache", "Dizziness", "Shortness of breath", "Chest pain", "Vision problems"],
    tips: ["Blood pressure medications", "Lifestyle changes", "Low sodium diet", "Regular exercise", "Weight management"],
  },
  {
    name: "Influenza",
    description:
      "A viral infection causing body aches, fever, fatigue, and headaches throughout the body.",
    symptoms: ["High fever", "Severe headache", "Body aches", "Fatigue", "Cough", "Sore throat"],
    tips: ["Antiviral medications", "Rest", "Fluids", "Pain relievers", "Annual vaccination for prevention"],
  },
  {
    name: "Typhoid fever",
    description:
      "A bacterial infection causing prolonged fever, weakness, and severe headaches, spread through contaminated food/water.",
    symptoms: ["Prolonged high fever", "Severe headache", "Weakness", "Abdominal pain", "Rose-colored rash", "Diarrhea or constipation"],
    tips: ["Antibiotics", "Supportive care", "Hydration", "Rest", "Vaccination for prevention"],
  },
  {
    name: "Brain tumor",
    description:
      "Abnormal growth in the brain that can cause progressively worsening headaches, often worse in the morning.",
    symptoms: ["Progressive headache", "Morning headaches", "Nausea and vomiting", "Vision problems", "Seizures", "Cognitive changes"],
    tips: ["Surgical removal", "Radiation therapy", "Chemotherapy", "Steroid medications", "Supportive care"],
  },
];

// --- Add/merge additional diseases (converted from treatments -> tips) ---
// The following entries were provided externally with a "treatments" field;
// we normalize them to use "tips" to align with the rest of the API.
const additionalDiseases = [
  {
    name: "Acne",
    description:
      "Acne is a common skin condition that occurs when hair follicles become clogged with oil and dead skin cells.",
    symptoms: ["Blackheads", "Whiteheads", "Pimples", "Cysts", "Nodules"],
    tips: [
      "Topical creams and gels containing benzoyl peroxide or retinoids",
      "Oral medications such as antibiotics or isotretinoin",
      "Chemical peels",
      "Laser and light therapies",
    ],
  },
  {
    name: "Appendicitis",
    description:
      "Appendicitis is a condition where the appendix becomes inflamed and swollen, usually as a result of an infection.",
    symptoms: [
      "Pain in the lower right side of the abdomen",
      "Nausea and vomiting",
      "Loss of appetite",
      "Fever",
      "Constipation or diarrhea",
    ],
    tips: [
      "Surgery to remove the appendix",
      "Antibiotics to treat the infection",
      "Pain medication",
    ],
  },
  {
    name: "Arthritis",
    description:
      "Arthritis is a condition where one or more joints become inflamed, causing pain, stiffness, and limited range of motion.",
    symptoms: [
      "Joint pain and stiffness",
      "Swelling and redness around the joint",
      "Limited range of motion",
      "Fatigue",
      "Fever",
    ],
    tips: ["Pain medication", "Anti-inflammatory drugs", "Physical therapy", "Joint replacement surgery"],
  },
  {
    name: "Asthma",
    description:
      "Asthma is a chronic condition where the airways in the lungs become inflamed and narrow, making it difficult to breathe.",
    symptoms: ["Wheezing", "Coughing", "Shortness of breath", "Chest tightness", "Difficulty breathing"],
    tips: [
      "Bronchodilators to open up the airways",
      "Corticosteroids to reduce inflammation",
      "Leukotriene modifiers",
      "Immunomodulators",
    ],
  },
  {
    name: "Atherosclerosis",
    description:
      "Atherosclerosis is a condition where plaque builds up inside the arteries, making them narrower and restricting blood flow.",
    symptoms: ["Chest pain", "Shortness of breath", "Weakness or numbness in limbs", "Headache", "Blurry vision"],
    tips: [
      "Lifestyle changes such as quitting smoking and eating a healthy diet",
      "Medications to lower cholesterol and blood pressure",
      "Angioplasty or stenting to open up blocked arteries",
      "Surgery to bypass blocked arteries",
    ],
  },
  {
    name: "Bronchitis",
    description:
      "Bronchitis is an inflammation of the lining of the bronchial tubes, which carry air to and from the lungs.",
    symptoms: ["Persistent cough", "Mucus production", "Wheezing", "Shortness of breath", "Chest discomfort"],
    tips: [
      "Rest and hydration",
      "Over-the-counter cough medicine",
      "Inhaled bronchodilators",
      "Corticosteroids",
      "Antibiotics (if bacterial)",
    ],
  },
  {
    name: "Cataracts",
    description:
      "Cataracts are a clouding of the eye's natural lens, which can cause blurry vision and eventually blindness if left untreated.",
    symptoms: [
      "Blurred or dimmed vision",
      "Difficulty seeing at night",
      "Sensitivity to light",
      "Frequent changes in eyeglass or contact lens prescription",
    ],
    tips: ["Prescription eyeglasses or contact lenses", "Surgery to remove and replace the clouded lens"],
  },
  {
    name: "Celiac disease",
    description:
      "Celiac disease is an autoimmune disorder in which the body's immune system attacks the small intestine when gluten is ingested, leading to damage and malabsorption of nutrients.",
    symptoms: [
      "Abdominal pain and bloating",
      "Diarrhea or constipation",
      "Fatigue",
      "Weight loss",
      "Iron-deficiency anemia",
    ],
    tips: ["A gluten-free diet", "Supplements to correct nutrient deficiencies"],
  },
  {
    name: "Cirrhosis",
    description:
      "Cirrhosis is a late stage of liver disease in which healthy liver tissue is replaced with scar tissue, impairing liver function and leading to a range of symptoms.",
    symptoms: [
      "Fatigue and weakness",
      "Loss of appetite and weight loss",
      "Nausea and vomiting",
      "Abdominal swelling and pain",
      "Jaundice (yellowing of the skin and eyes)",
    ],
    tips: [
      "Treatment of underlying causes (e.g., alcohol cessation, hepatitis treatment)",
      "Medications to manage symptoms",
      "Liver transplant in severe cases",
    ],
  },
  {
    name: "Colitis",
    description:
      "Colitis is an inflammation of the colon, which can cause a range of symptoms depending on the underlying cause.",
    symptoms: [
      "Abdominal pain and cramping",
      "Diarrhea or constipation",
      "Rectal bleeding",
      "Urgent bowel movements",
      "Fever and fatigue",
    ],
    tips: ["Anti-inflammatory medications", "Immunosuppressants", "Surgery to remove the colon in severe cases"],
  },
  {
    name: "Conjunctivitis",
    description:
      "Conjunctivitis, also known as pink eye, is an inflammation of the conjunctiva, which is the thin, clear tissue that lines the inside of the eyelid and covers the white part of the eye.",
    symptoms: [
      "Redness in the white of the eye or inner eyelid",
      "Increased amount of tears",
      "Thick yellow discharge that crusts over the eyelashes, especially after sleep",
      "Itchy or burning eyes",
      "Blurred vision",
      "Sensitivity to light",
    ],
    tips: ["Artificial tears", "Antihistamine eye drops", "Topical corticosteroids", "Cold compresses", "Warm compresses"],
  },
  {
    name: "Crohn's disease",
    description:
      "Crohn's disease is a type of inflammatory bowel disease that can affect any part of the gastrointestinal tract from mouth to anus. Symptoms include abdominal pain, diarrhea, and weight loss.",
    symptoms: [
      "Abdominal pain and cramping",
      "Diarrhea",
      "Blood in your stool",
      "Reduced appetite and weight loss",
      "Fatigue",
      "Fever",
    ],
    tips: [
      "Anti-inflammatory drugs",
      "Immune system suppressors",
      "Antibiotics",
      "Nutrition therapy",
      "Surgery",
    ],
  },
  {
    name: "Cystic fibrosis",
    description:
      "Cystic fibrosis is an inherited disorder that causes severe damage to the lungs, digestive system and other organs in the body. It affects the cells that produce mucus, sweat and digestive juices.",
    symptoms: [
      "Persistent cough with thick mucus",
      "Wheezing or shortness of breath",
      "Poor growth or weight gain",
      "Frequent respiratory infections",
      "Salty-tasting skin",
      "Difficulty with bowel movements",
    ],
    tips: [
      "Airway clearance techniques",
      "Inhaled medications",
      "Oral pancreatic enzyme supplements",
      "Antibiotics",
      "Nutrition therapy",
    ],
  },
  {
    name: "Dementia",
    description:
      "Dementia is a general term for a decline in mental ability severe enough to interfere with daily life. Memory loss is an example. Alzheimer's is the most common type of dementia.",
    symptoms: [
      "Memory loss",
      "Difficulty communicating",
      "Inability to focus or pay attention",
      "Poor reasoning or judgment",
      "Confusion and disorientation",
      "Mood changes",
    ],
    tips: [
      "Medications to treat cognitive symptoms",
      "Antidepressants",
      "Antipsychotics",
      "Occupational therapy",
      "Speech therapy",
    ],
  },
  {
    name: "Diabetes mellitus",
    description:
      "Diabetes mellitus is a chronic metabolic disorder characterized by high blood sugar levels due to the body's inability to produce or use insulin effectively.",
    symptoms: [
      "Increased thirst",
      "Frequent urination",
      "Extreme hunger",
      "Unexplained weight loss",
      "Fatigue",
      "Blurred vision",
      "Slow-healing sores or frequent infections",
      "Tingling or numbness in the hands or feet",
      "Dry, itchy skin",
    ],
    tips: [
      "Lifestyle changes (e.g. diet, exercise)",
      "Oral medications (e.g. metformin, sulfonylureas)",
      "Insulin therapy",
      "Blood sugar monitoring",
      "Regular check-ups with a healthcare provider",
    ],
  },
  {
    name: "Emphysema",
    description:
      "Emphysema is a lung disease that damages the air sacs in the lungs. This damage makes it harder to breathe and can lead to shortness of breath, coughing, and wheezing.",
    symptoms: [
      "Shortness of breath, especially during physical activities",
      "Wheezing",
      "Chest tightness",
      "Chronic cough",
      "Lack of energy",
    ],
    tips: [
      "Quitting smoking",
      "Medications such as bronchodilators, inhaled steroids, or oxygen therapy",
      "Pulmonary rehabilitation",
      "Lung volume reduction surgery",
      "Lung transplant",
    ],
  },
  {
    name: "Endometriosis",
    description:
      "Endometriosis is a condition where the tissue that normally lines the inside of the uterus grows outside of it, leading to pain and discomfort.",
    symptoms: [
      "Painful periods",
      "Pain during intercourse",
      "Painful bowel movements or urination during menstruation",
      "Excessive bleeding",
      "Infertility",
    ],
    tips: [
      "Pain relievers such as nonsteroidal anti-inflammatory drugs (NSAIDs)",
      "Hormone therapy",
      "Surgery to remove endometrial tissue",
      "Assisted reproductive technologies (ART)",
    ],
  },
  {
    name: "Epilepsy",
    description:
      "Epilepsy is a neurological disorder that causes seizures, which can range from mild to severe and affect different parts of the brain.",
    symptoms: [
      "Seizures",
      "Temporary confusion",
      "Staring spells",
      "Loss of consciousness",
      "Psychic symptoms",
    ],
    tips: [
      "Antiepileptic drugs (AEDs)",
      "Surgery to remove the part of the brain causing seizures",
      "Vagus nerve stimulation (VNS)",
      "Ketogenic diet",
    ],
  },
  {
    name: "Fibromyalgia",
    description:
      "Fibromyalgia is a chronic condition that causes widespread pain and tenderness in the body, as well as fatigue, sleep disturbances, and cognitive difficulties.",
    symptoms: [
      "Widespread pain",
      "Tender points",
      "Fatigue",
      "Sleep disturbances",
      "Cognitive difficulties",
    ],
    tips: [
      "Pain relievers such as acetaminophen, NSAIDs, or opioids",
      "Antidepressants",
      "Anticonvulsants",
      "Physical therapy",
      "Counseling",
    ],
  },
  {
    name: "Gallstones",
    description:
      "Gallstones are hardened deposits of digestive fluid that can form in the gallbladder, causing pain and other complications.",
    symptoms: [
      "Sudden and rapidly intensifying pain in the upper right portion of your abdomen",
      "Pain in the back between the shoulder blades",
      "Pain in the right shoulder",
      "Nausea",
      "Vomiting",
    ],
    tips: [
      "Surgery to remove the gallbladder (cholecystectomy)",
      "Medications to dissolve gallstones",
      "Lithotripsy",
    ],
  },
  {
    name: "Gastritis",
    description: "Inflammation of the stomach lining",
    symptoms: ["Abdominal pain", "Nausea", "Vomiting"],
    tips: ["Antacids", "Proton pump inhibitors", "Dietary changes"],
  },
  {
    name: "Glaucoma",
    description: "Damage to the optic nerve that can lead to vision loss",
    symptoms: ["Blurred vision", "Eye pain", "Headaches"],
    tips: ["Eye drops", "Laser surgery", "Trabeculectomy"],
  },
  {
    name: "Gout",
    description:
      "A type of arthritis caused by a buildup of uric acid crystals in the joints",
    symptoms: ["Intense joint pain", "Swelling", "Redness"],
    tips: [
      "Nonsteroidal anti-inflammatory drugs (NSAIDs)",
      "Colchicine",
      "Urate-lowering therapy",
    ],
  },
];

// Merge: overwrite existing entries with the same name (case-insensitive), else append
for (const entry of additionalDiseases) {
  const idx = diseases.findIndex(
    (d) => d.name && d.name.toLowerCase() === entry.name.toLowerCase()
  );
  if (idx >= 0) {
    diseases[idx] = entry;
  } else {
    diseases.push(entry);
  }
}

// --- Routes ---

// Find disease by exact name (case-insensitive)
app.get("/api/disease/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const disease = diseases.find((d) => d.name.toLowerCase() === name);
  if (!disease) {
    return res.status(404).json({ error: "Disease not found" });
  }
  res.json(disease);
});

// Return list of all disease names
app.get("/api/diseases", (req, res) => {
  res.json(diseases.map((d) => d.name));
});

// Search diseases by symptom or keyword
app.get("/api/search/:symptom", (req, res) => {
  const symptom = req.params.symptom.toLowerCase();
  const matchingDiseases = diseases.filter(
    (disease) =>
      disease.symptoms.some((s) => s.toLowerCase().includes(symptom)) ||
      disease.name.toLowerCase().includes(symptom) ||
      disease.description.toLowerCase().includes(symptom)
  );

  if (matchingDiseases.length === 0) {
    return res.status(404).json({ error: "No diseases found matching that symptom" });
  }

  res.json(matchingDiseases);
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("✅ HealthBot backend is running.");
});

// --- Start Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));