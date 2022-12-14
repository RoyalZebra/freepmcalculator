import { Activity } from './interfaces';

export const generateSuccessorsSets = (
  activities: Activity[],
): Set<number>[] => {
  const successorsSet = activities.map((_) => new Set<number>());
  activities.forEach((act) => {
    act.predecessors.forEach((predIdx) => {
      successorsSet[predIdx].add(act.index);
    });
  });
  return successorsSet;
};

export const numToLetter = (num: number): string =>{
  if(num === 0){
    return 'A (Start)'
  }
  return String.fromCodePoint('A'.charCodeAt(0) + num);
}
  
