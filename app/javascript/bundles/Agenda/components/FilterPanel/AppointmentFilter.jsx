import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'

const AppointmentFilter = ({
  onCanceledClick,
  onConcludedClick,
}) => (
  <div style={{ border: '1px solid #d9d9d9', marginTop: '20px' }}>
    <div style={{ margin: '4px 0px', borderBottom: '1px solid #d9d9d9' }}>
      <h3
        style={{ padding: '2px 12px' }}
      >
        Filtro citas
      </h3>
    </div>
    <div style={{ marginBottom: '5px', marginTop: '10px' }}>
      <Checkbox
        onChange={onCanceledClick}
        style={{ marginLeft: '8px', marginBottom: '10px' }}
      >
        Mostrar citas canceladas
      </Checkbox>
      <Checkbox
        onChange={onConcludedClick}
        style={{ marginLeft: '8px', marginBottom: '10px' }}
      >
        Mostrar citas concluidas
      </Checkbox>
    </div>
  </div>
)

AppointmentFilter.propTypes = {
  onCanceledClick: PropTypes.func.isRequired,
  onConcludedClick: PropTypes.func.isRequired,
}

export default AppointmentFilter
