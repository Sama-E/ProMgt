import React from 'react'
import BugPriorityPage from '../BugPriorityPage';
import { Priority } from '@/state/api';


const Urgent = () => {
  return <BugPriorityPage priority={Priority.Low} />;
}

export default Urgent