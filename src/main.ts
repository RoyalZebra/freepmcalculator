import { addRowProcedure, rmvRowProcedure } from './buttonProvider';
import { calculateActivitiesWithTimes } from './ActivityDurationCalculator';
import { generateCPMGraph } from './CriticalPathMethodGraph';
import { generatePERTGraph } from './PertChart';
import { LinkCPM, LinkPERT, NodeCPM, NodePERT } from './interfaces';
import { validateAndParseActivities } from './InputValidation';

declare global {
  interface Window {
    cpm_nodes: NodeCPM[];
    cpm_links: LinkCPM[];
    pert_nodes: NodePERT[];
    pert_links: LinkPERT[];
  }
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    document.getElementById('add-row-btn').onclick = addRowProcedure;
    document.getElementById('rmv-row-btn').onclick = rmvRowProcedure;
    document.getElementById('gen-graphs-btn').onclick = generateGraphs;
  }
});

const generateGraphs = () => {
  const { activities, error } = validateAndParseActivities();
  if (!!error) {
    document.getElementById('error-msg').innerText = error;
    return;
  }
  document.getElementById('error-msg').innerText = '';
  const activitiesWithTimes = calculateActivitiesWithTimes(activities);
  generateCPMGraph(activitiesWithTimes);
  generatePERTGraph(activitiesWithTimes);
};
