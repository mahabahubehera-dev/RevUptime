export type MachineStatus = 'Healthy' | 'Warning' | 'Critical';

export interface SensorReading {
  label: string;
  value: string;
  unit: string;
  trend: string;
}

export interface MachineAsset {
  id: string;
  name: string;
  type: string;
  health: number;
  status: MachineStatus;
  risk: string;
  vibration: number;
  temperature: number;
  rpm: number;
  updated: string;
  description: string;
  sensors: SensorReading[];
  rootCause: string;
  recommendation: string;
}

export interface AnomalyItem {
  machine: string;
  parameter: string;
  time: string;
  severity: 'High' | 'Medium' | 'Low';
  observed: string;
  baseline: string;
  deviation: string;
  trend: string;
  explanation: string;
}

export interface PredictionCard {
  title: string;
  machine: string;
  risk: 'High' | 'Medium' | 'Low';
  summary: string;
  signals: string[];
  recommendation: string;
}

export interface AIInsight {
  title: string;
  summary: string;
}

export interface EquipmentItem {
  name: string;
  description: string;
  sensors: string[];
  insights: string[];
}

export const machineAssets: MachineAsset[] = [
  {
    id: 'mtr-204',
    name: 'Motor MTR-204',
    type: 'Electric Motor',
    health: 91,
    status: 'Healthy',
    risk: 'Low',
    vibration: 2.8,
    temperature: 68,
    rpm: 1480,
    updated: '2 min ago',
    description: 'Illustrative demo asset with healthy operating pattern and stable signal quality.',
    sensors: [
      { label: 'Vibration', value: '2.8', unit: 'mm/s', trend: 'Normal' },
      { label: 'Temperature', value: '68', unit: '°C', trend: 'Stable' },
      { label: 'RPM', value: '1480', unit: 'RPM', trend: 'Nominal' },
      { label: 'Current', value: '36', unit: 'A', trend: 'Nominal' },
    ],
    rootCause: 'Machine remains within its learned operating range and shows no sustained abnormal pattern.',
    recommendation: 'Continue routine condition monitoring and maintain current inspection rhythm.',
  },
  {
    id: 'mtr-104',
    name: 'ID Fan Motor M-104',
    type: 'Fan Motor',
    health: 72,
    status: 'Warning',
    risk: 'High',
    vibration: 4.2,
    temperature: 68,
    rpm: 1460,
    updated: '5 min ago',
    description: 'Vibration has remained above the learned operating baseline and is trending upward over the past hours.',
    sensors: [
      { label: 'Vibration', value: '4.2', unit: 'mm/s', trend: 'Increasing' },
      { label: 'Temperature', value: '68', unit: '°C', trend: 'Rising' },
      { label: 'RPM', value: '1460', unit: 'RPM', trend: 'Stable' },
      { label: 'Current', value: '42', unit: 'A', trend: 'Elevated' },
    ],
    rootCause: 'Potential developing bearing or mounting issue suggested by increasing vibration and rising temperature.',
    recommendation: 'Inspect drive-end bearing condition and check mounting integrity during the next maintenance opportunity.',
  },
  {
    id: 'pump-012',
    name: 'Slurry Pump P-012',
    type: 'Process Pump',
    health: 38,
    status: 'Critical',
    risk: 'Critical',
    vibration: 7.9,
    temperature: 81,
    rpm: 980,
    updated: '1 min ago',
    description: 'Abnormal vibration and elevated temperature indicate a high-risk operating condition requiring immediate review.',
    sensors: [
      { label: 'Vibration', value: '7.9', unit: 'mm/s', trend: 'Severe' },
      { label: 'Temperature', value: '81', unit: '°C', trend: 'High' },
      { label: 'RPM', value: '980', unit: 'RPM', trend: 'Lower than target' },
      { label: 'Load', value: '86', unit: '%', trend: 'Increased' },
    ],
    rootCause: 'Severe vibrational deviation and elevated temperature are consistent with a developing mechanical wear or lubrication issue.',
    recommendation: 'Dispatch engineering review and check pump seal, bearing and lubrication condition before continuing high-load operation.',
  },
  {
    id: 'fan-012',
    name: 'Cooling Fan F-012',
    type: 'Industrial Fan',
    health: 84,
    status: 'Healthy',
    risk: 'Low',
    vibration: 2.1,
    temperature: 57,
    rpm: 1180,
    updated: '8 min ago',
    description: 'Stable operating pattern with no sustained deviation from the healthy baseline.',
    sensors: [
      { label: 'Vibration', value: '2.1', unit: 'mm/s', trend: 'Normal' },
      { label: 'Temperature', value: '57', unit: '°C', trend: 'Stable' },
      { label: 'RPM', value: '1180', unit: 'RPM', trend: 'Nominal' },
      { label: 'Current', value: '27', unit: 'A', trend: 'Normal' },
    ],
    rootCause: 'No active anomaly is present within the machine-specific baseline model.',
    recommendation: 'Keep the asset in normal monitoring cadence and continue routine checks.',
  },
];

export const anomalyFeed: AnomalyItem[] = [
  {
    machine: 'Motor MTR-204',
    parameter: 'Vibration',
    time: 'Today · 09:42',
    severity: 'High',
    observed: '4.2 mm/s',
    baseline: '2.8 mm/s',
    deviation: '+42%',
    trend: 'Increasing',
    explanation: 'Vibration has remained above the learned operating range and shows an increasing trend.',
  },
  {
    machine: 'ID Fan Motor M-104',
    parameter: 'Temperature',
    time: 'Today · 08:15',
    severity: 'Medium',
    observed: '68°C',
    baseline: '59°C',
    deviation: '+15%',
    trend: 'Rising',
    explanation: 'Temperature increase is sustained and appears alongside an increase in vibration.',
  },
  {
    machine: 'Slurry Pump P-012',
    parameter: 'Load',
    time: 'Today · 06:50',
    severity: 'High',
    observed: '86%',
    baseline: '70%',
    deviation: '+23%',
    trend: 'Elevated',
    explanation: 'Load remains above the expected operating envelope and may contribute to abnormal vibration.',
  },
];

export const predictionCards: PredictionCard[] = [
  {
    title: 'Potential Bearing Degradation',
    machine: 'Motor MTR-204',
    risk: 'High',
    summary: 'Observed signal behaviour is inconsistent with the machine’s learned baseline and may indicate a developing bearing-related issue.',
    signals: ['Vibration ↑', 'Temperature ↑', 'Frequency pattern change'],
    recommendation: 'Inspect drive-end bearing and lubrication condition during the next maintenance window.',
  },
  {
    title: 'Mounting or Alignment Drift',
    machine: 'ID Fan Motor M-104',
    risk: 'Medium',
    summary: 'A sustained deviation in vibration plus elevated current suggests a likely mounting or alignment issue.',
    signals: ['Vibration ↑', 'Current ↑', 'Trend persists'],
    recommendation: 'Check base condition, fasteners and coupling alignment before further load increases.',
  },
  {
    title: 'Seal or Bearing Wear',
    machine: 'Slurry Pump P-012',
    risk: 'High',
    summary: 'The operating pattern suggests elevated mechanical load and a developing wear condition that merits early investigation.',
    signals: ['High vibration', 'Temperature rise', 'Load increase'],
    recommendation: 'Arrange engineering inspection and verify seal and bearing condition before extended operation.',
  },
];

export const aiPrescriptions = [
  {
    machine: 'Motor MTR-204',
    pattern: 'Increasing vibration',
    risk: 'High',
    fault: 'Bearing degradation',
    evidence: 'Vibration above baseline, rising trend, temperature increase',
    action: 'Inspect drive-end bearing and lubrication condition.',
  },
  {
    machine: 'ID Fan Motor M-104',
    pattern: 'Abnormal vibration + elevated current',
    risk: 'Medium',
    fault: 'Mounting drift',
    evidence: 'Three-hour trend deviation, abnormal frequency component, increased current draw',
    action: 'Review base integrity, alignment and fastening condition.',
  },
];

export const equipmentLibrary: EquipmentItem[] = [
  {
    name: 'Motors',
    description: 'Track vibration, temperature, current and RPM patterns for rotating assets that drive production.',
    sensors: ['Vibration', 'Temperature', 'Current', 'RPM'],
    insights: ['Bearing behaviour', 'Imbalance patterns', 'Misalignment', 'Overheating'],
  },
  {
    name: 'Pumps',
    description: 'Monitor pump health for cavitation, looseness, seal wear and abnormal load behaviour.',
    sensors: ['Vibration', 'Pressure', 'Temperature', 'Flow'],
    insights: ['Seal wear', 'Cavitation risk', 'Lubrication issues', 'Abnormal load'],
  },
  {
    name: 'Fans',
    description: 'Understand airflow systems, rotating imbalance, and high-heat conditions across cooling and ventilation assets.',
    sensors: ['Vibration', 'Temperature', 'Current', 'RPM'],
    insights: ['Imbalance', 'Bearing wear', 'Motor loading', 'Airflow drift'],
  },
  {
    name: 'Compressors',
    description: 'Review pressure fluctuations, abnormal temperature changes and intermittent mechanical stress.',
    sensors: ['Vibration', 'Pressure', 'Temperature', 'Load'],
    insights: ['Pressure instability', 'Valve issues', 'Mechanical stress', 'Lubrication drift'],
  },
];

export const plantAssets = [
  { name: 'Motor MTR-204', status: 'Healthy', x: 16, y: 18 },
  { name: 'Pump P-012', status: 'Critical', x: 58, y: 26 },
  { name: 'ID Fan M-104', status: 'Warning', x: 42, y: 52 },
  { name: 'Cooling Fan F-012', status: 'Healthy', x: 72, y: 66 },
  { name: 'Compressor C-008', status: 'Healthy', x: 22, y: 70 },
  { name: 'Gearbox G-110', status: 'Warning', x: 62, y: 74 },
];
