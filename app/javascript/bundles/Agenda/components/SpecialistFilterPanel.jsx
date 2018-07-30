import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Button, Badge } from 'antd'

import getAvatarColor from '../resourceColors'

const SpecialistFilterPanel = ({
  handleSpecialistClick,
  filtersBySpecialist,
  specialists,
  viewAllSpecialists,
}) => (
  <div style={{ border: '1px solid #d9d9d9', marginTop: '42px' }}>
    <div style={{ margin: '4px 0px', borderBottom: '1px solid #d9d9d9' }}>
      <h3
        style={{ padding: '5px 0px 0px 12px' }}
      >
        Filtro Personal
      </h3>
    </div>
    <Menu
      onClick={handleSpecialistClick}
      selectedKeys={[filtersBySpecialist]}
      // style={{ width: 256 }}
      // defaultSelectedKeys={['1']}
      mode="inline"
    >
      {specialists.map(specialist => (
        <Menu.Item key={specialist.id}>
          {/* <Avatar
            shape="square"
            size="small"
            style={{ backgroundColor: getAvatarColor(specialist.id) }}
          /> */}
          <Badge
            dot
            style={{
              backgroundColor: getAvatarColor(specialist.id),
              width: '20px',
              height: '20px',
              borderRadius: '4px',
            }}
          />
          {specialist.name}
        </Menu.Item>
      ))}
    </Menu>
    <div style={{ textAlign: 'center', paddingBottom: '10px', paddingTop: '5px' }}>
      <Button
        size="small"
        onClick={viewAllSpecialists}
      >
        Ver todo
      </Button>
    </div>
  </div>
)

SpecialistFilterPanel.propTypes = {
  handleSpecialistClick: PropTypes.func.isRequired,
  filtersBySpecialist: PropTypes.string,
  specialists: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  viewAllSpecialists: PropTypes.func.isRequired,
}

SpecialistFilterPanel.defaultProps = {
  filtersBySpecialist: null,
}

export default SpecialistFilterPanel
