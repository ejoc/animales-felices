import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Button } from 'antd'

const ServiceFilter = ({
  handleServiceClick,
  filtersByService,
  services,
  viewAllServices,
}) => (
  <div
    style={{
      border: '1px solid #d9d9d9',
      marginTop: '20px',
      backgroundColor: '#FFF',
    }}
  >
    <div style={{ margin: '4px 0px', borderBottom: '1px solid #d9d9d9' }}>
      <h3 style={{ padding: '2px 12px' }}>
        Filtro Servicios
        <span style={{ float: 'right' }}>
          <Button size="small" onClick={viewAllServices}>
            Quitar filtros
          </Button>
        </span>
      </h3>
    </div>
    <div style={{ marginBottom: '5px' }}>
      <Menu
        onClick={handleServiceClick}
        selectedKeys={[filtersByService]}
        // style={{ width: 256 }}
        // defaultSelectedKeys={['1']}
        mode="inline"
      >
        {services.map(service => (
          <Menu.Item key={service.id}>{service.attributes.name}</Menu.Item>
        ))}
      </Menu>
    </div>
  </div>
)

ServiceFilter.propTypes = {
  handleServiceClick: PropTypes.func.isRequired,
  filtersByService: PropTypes.string,
  services: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  viewAllServices: PropTypes.func.isRequired,
}

ServiceFilter.defaultProps = {
  filtersByService: null,
}

export default ServiceFilter
