import React from 'react'
import Topbar from './Topbar'

/**
 * BasePage Component
 * 
 * This is the base layout component that all pages should extend.
 * It provides:
 * - Consistent main content wrapper
 * - Topbar navigation
 * - Responsive layout that adapts to sidebar state
 * - Consistent padding and structure
 * 
 * Usage:
 * ```jsx
 * const MyPage = ({ isNavActive, onToggleNav }) => {
 *   return (
 *     <BasePage isNavActive={isNavActive} onToggleNav={onToggleNav}>
 *       <h1>My Page Content</h1>
 *     </BasePage>
 *   )
 * }
 * ```
 */

const BasePage = ({
  children,
  isNavActive = false,
  onToggleNav,
  title,
  subtitle,
  headerActions,
  showTopbar = true,
  className = '',
  contentClassName = '',
}) => {
  return (
    <div className={`main ${isNavActive ? 'active' : ''} ${className}`}>
      {showTopbar && <Topbar onToggleNav={onToggleNav} />}
      
      {(title || subtitle || headerActions) && (
        <div
          style={{
            padding: '20px 20px 0 20px',
            borderBottom: title ? '1px solid #e5e5e5' : 'none',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: title && headerActions ? 'center' : 'flex-start',
              marginBottom: subtitle ? '10px' : '0',
            }}
          >
            <div>
              {title && (
                <h1
                  style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    color: '#2a2185',
                    margin: 0,
                    marginBottom: subtitle ? '8px' : '0',
                  }}
                >
                  {title}
                </h1>
              )}
              {subtitle && (
                <p
                  style={{
                    fontSize: '16px',
                    color: '#666',
                    margin: 0,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
            {headerActions && (
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                {headerActions}
              </div>
            )}
          </div>
        </div>
      )}

      <div
        className={contentClassName}
        style={{
          padding: title || subtitle || headerActions ? '0 20px 20px 20px' : '20px',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default BasePage

