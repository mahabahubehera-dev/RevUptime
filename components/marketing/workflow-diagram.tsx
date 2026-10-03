import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export function WorkflowDiagram() {
  return <figure className="workflow-diagram">
    <div className="workflow-diagram-heading">
      <span className="section-eyebrow">FROM SENSOR TO ALERT</span>
      <a href="/images/how-it-works-signal-flow.webp" target="_blank" rel="noopener noreferrer" aria-label="Open the Sense, Connect, Analyze, Alert diagram at full size in a new tab">View full diagram <ArrowUpRight size={15}/></a>
    </div>
    <a className="workflow-diagram-image" href="/images/how-it-works-signal-flow.webp" target="_blank" rel="noopener noreferrer" aria-label="Enlarge the sensor-to-alert diagram in a new tab">
      <Image src="/images/how-it-works-signal-flow.webp" alt="Sensor-to-alert diagram: Sense — vibration and temperature sensors on a motor; Connect — a gateway carries the readings; Analyze — cloud analysis reviews the data; Alert — a notification reaches a phone." width={1500} height={568} sizes="(max-width: 767px) 100vw, 50vw"/>
    </a>
    <figcaption><span>Sense</span><span aria-hidden="true">→</span><span>Connect</span><span aria-hidden="true">→</span><span>Analyze</span><span aria-hidden="true">→</span><span>Alert</span></figcaption>
  </figure>;
}
