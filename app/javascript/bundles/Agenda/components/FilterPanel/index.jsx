import React from 'react'
import { Calendar } from 'antd'

import SpecialistFilter from './SpecialistFilter'
import ServiceFilter from './ServiceFilter'

const FilterPanel = ({
  handleCalendarSelect,
  handleSpecialistClick,
  filtersBySpecialist,
  specialists,
  viewAllSpecialists,

  handleServiceClick,
  filtersByService,
  services,
  viewAllServices,  
}) => (
  <React.Fragment>
    <div style={{ width: 270, border: '1px solid #d9d9d9', borderRadius: 4 }}>
      <Calendar
        fullscreen={false}
        // value={moment(day)}
        // onPanelChange={this.onPanelChange}
        onSelect={handleCalendarSelect}
      />
    </div>
    <SpecialistFilter
      handleSpecialistClick={handleSpecialistClick}
      filtersBySpecialist={filtersBySpecialist}
      specialists={specialists}
      viewAllSpecialists={viewAllSpecialists}
    />

    <ServiceFilter
      handleServiceClick={handleServiceClick}
      filtersByService={filtersByService}
      services={services}
      viewAllServices={viewAllServices}
    />
  </React.Fragment>
)

export default FilterPanel
