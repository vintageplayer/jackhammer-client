import React, {Component} from 'react'
import '../../../stylesheets/scans.css'
export const severityCounts = (cell, row) => {
  return (
    <ul class="inline alert-badges">
      <li class="severity-badge light critical-badge text-center" title="Critical">
        {row.criticalCount}
      </li>
      <li class="severity-badge light high-badge text-center" title="High">
        {row.highCount}
      </li>
      <li class="severity-badge light medium-badge text-center" title="Medium">
        {row.mediumCount}
      </li>
      <li class="severity-badge light low-badge text-center" title="Low">
        {row.lowCount}
      </li>
      <li class="severity-badge light info-badge text-center" title="Info">
        {row.infoCount}
      </li>
    </ul>
  )
}
