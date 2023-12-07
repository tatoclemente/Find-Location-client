import React from 'react'
import { IconButton } from '@mui/material'
import { GitHub, LinkedIn } from '@mui/icons-material'

const Footer = () => {
  return (
    <footer>
      <div>
      </div>
      <div>
        © {new Date().getFullYear()} Tato Clemente. All rights reserved.{' '}
      </div>
      <div>
        <IconButton style={{color: '#008588'}} aria-label='Go to GitHub'>
          <GitHub />
        </IconButton>
        <IconButton style={{color: '#008588'}} aria-label='Go to GitHub'>
          <LinkedIn />
        </IconButton>
      </div>
    </footer>
  )
}

export default Footer