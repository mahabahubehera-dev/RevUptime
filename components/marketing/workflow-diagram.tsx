import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export function WorkflowDiagram() {
  return <figure className="workflow-diagram">
    <div className="workflow-diagram-heading">
      <span className="section-eyebrow">FROM MACHINE SIGNALS TO MAINTENANCE ACTION</span>
      <a href="/images/revuptime-condition-monitoring-workflow.png" target="_blank" rel="noopener noreferrer" aria-label="Open the seven-step machine monitoring workflow at full size in a new tab">View full diagram <ArrowUpRight size={15}/></a>
    </div>
    <a className="workflow-diagram-image" href="/images/revuptime-condition-monitoring-workflow.png" target="_blank" rel="noopener noreferrer" aria-label="Enlarge the seven-step machine monitoring workflow in a new tab">
      <Image src="/images/revuptime-condition-monitoring-workflow.png" alt="Seven-step RevUptime workflow: Sense machine condition, connect through a gateway, analyze trends, alert the team, operator review, maintenance manager planning, and close operations." width={2048} height={667} sizes="(max-width: 767px) 100vw, 50vw"/>
    </a>
    <figcaption><span>Sense</span><span aria-hidden="true">→</span><span>Connect</span><span aria-hidden="true">→</span><span>Analyze</span><span aria-hidden="true">→</span><span>Alert</span><span aria-hidden="true">→</span><span>Operator</span><span aria-hidden="true">→</span><span>Maintenance</span><span aria-hidden="true">→</span><span>Close</span></figcaption>
  </figure>;
}
