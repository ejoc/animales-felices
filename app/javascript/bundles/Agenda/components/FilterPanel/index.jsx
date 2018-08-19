import React from 'react'
import { Calendar } from 'antd'

import SpecialistFilter from './SpecialistFilter'
import ServiceFilter from './ServiceFilter'
import AppointmentFilter from './AppointmentFilter'

const FilterPanel = ({
  filters,
  handleCalendarSelect,
  handleSpecialistClick,
  specialists,
  viewAllSpecialists,

  handleServiceClick,
  services,
  viewAllServices,

  onConcludedClick,
  onCanceledClick,
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

    <AppointmentFilter
      onCanceledClick={onCanceledClick}
      onConcludedClick={onConcludedClick}
    />

    <SpecialistFilter
      handleSpecialistClick={handleSpecialistClick}
      filtersBySpecialist={filters.specialistId}
      specialists={specialists}
      viewAllSpecialists={viewAllSpecialists}
    />

    <ServiceFilter
      handleServiceClick={handleServiceClick}
      filtersByService={filters.serviceId}
      services={services}
      viewAllServices={viewAllServices}
    />
  </React.Fragment>
)

export default FilterPanel
