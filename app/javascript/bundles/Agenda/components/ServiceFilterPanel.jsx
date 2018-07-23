import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Button } from 'antd'

const ServiceFilterPanel = ({
  handleServiceClick,
  filtersByService,
  services,
  viewAllServices,
}) => (
  <div style={{ border: '1px solid #d9d9d9', marginTop: '42px' }}>
    <div style={{ margin: '4px 0px', borderBottom: '1px solid #d9d9d9' }}>
      <h3
        style={{ padding: '5px 0px 0px 12px' }}
      >
        Filtro Servicios
      </h3>
    </div>
    <Menu
      onClick={handleServiceClick}
      selectedKeys={[filtersByService]}
      // style={{ width: 256 }}
      // defaultSelectedKeys={['1']}
      mode="inline"
    >
      {services.map(service => (
        <Menu.Item key={service.id}>
          {service.name}
        </Menu.Item>
      ))}
    </Menu>
    <div style={{ textAlign: 'center', paddingBottom: '10px', paddingTop: '5px' }}>
      <Button
        size="small"
        onClick={viewAllServices}
      >
        Ver todo
      </Button>
    </div>
  </div>
)

ServiceFilterPanel.propTypes = {
  handleServiceClick: PropTypes.func.isRequired,
  filtersByService: PropTypes.string,
  services: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  viewAllServices: PropTypes.func.isRequired,
}

ServiceFilterPanel.defaultProps = {
  filtersByService: null,
}

export default ServiceFilterPanel
