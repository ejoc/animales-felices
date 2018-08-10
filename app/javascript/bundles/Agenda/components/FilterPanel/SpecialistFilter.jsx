import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Button, Badge } from 'antd'

import getAvatarColor from '../../resourceColors'

const SpecialistFilter = ({
  handleSpecialistClick,
  filtersBySpecialist,
  specialists,
  viewAllSpecialists,
}) => (
  <div style={{ border: '1px solid #d9d9d9', marginTop: '20px' }}>
    <div style={{ margin: '4px 0px', borderBottom: '1px solid #d9d9d9' }}>
      <h3
        style={{ padding: '2px 12px' }}
      >
        Filtro Personal
        <span style={{ float: 'right' }}>
          <Button
            size="small"
            onClick={viewAllSpecialists}
          >
            Quitar filtros
          </Button>
        </span>
      </h3>
    </div>
    <div style={{ marginBottom: '5px' }}>
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
            {specialist.attributes.name}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  </div>
)

SpecialistFilter.propTypes = {
  handleSpecialistClick: PropTypes.func.isRequired,
  filtersBySpecialist: PropTypes.string,
  specialists: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  viewAllSpecialists: PropTypes.func.isRequired,
}

SpecialistFilter.defaultProps = {
  filtersBySpecialist: null,
}

export default SpecialistFilter
