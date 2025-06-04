import React, { useState } from 'react';
import './App.css';

const SkipSelector = () => {
  const [selectedSkip, setSelectedSkip] = useState(17935);
  const [showDetails, setShowDetails] = useState(false);

  // Skip data from the provided JSON
  const skips = [
    {
      id: 17933,
      size: 4,
      hire_period_days: 14,
      price_before_vat: 278,
      vat: 20,
      allowed_on_road: true,
      allows_heavy_waste: true
    },
    {
      id: 17934,
      size: 6,
      hire_period_days: 14,
      price_before_vat: 305,
      vat: 20,
      allowed_on_road: true,
      allows_heavy_waste: true
    },
    {
      id: 17935,
      size: 8,
      hire_period_days: 14,
      price_before_vat: 375,
      vat: 20,
      allowed_on_road: true,
      allows_heavy_waste: true
    },
    {
      id: 17936,
      size: 10,
      hire_period_days: 14,
      price_before_vat: 400,
      vat: 20,
      allowed_on_road: false,
      allows_heavy_waste: false
    },
    {
      id: 17937,
      size: 12,
      hire_period_days: 14,
      price_before_vat: 439,
      vat: 20,
      allowed_on_road: false,
      allows_heavy_waste: false
    },
    {
      id: 17938,
      size: 14,
      hire_period_days: 14,
      price_before_vat: 470,
      vat: 20,
      allowed_on_road: false,
      allows_heavy_waste: false
    }
  ];

  const handleSelectSkip = (id: number) => {
    setSelectedSkip(id);
  };

  const calculateTotalPrice = (skip : any) => {
    const vatAmount = (skip.price_before_vat * skip.vat) / 100;
    return skip.price_before_vat + vatAmount;
  };

  const getSkipImage = (size: number) => {
    return `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`;
  };

  const getSizeDescription = (size: 4 | 6 | 8 | 10 | 12 | 14) => {
    const descriptions = {
      4: "Small garden clearance",
      6: "Medium renovation project",
      8: "Large home renovation",
      10: "Construction projects",
      12: "Large scale work",
      14: "Industrial projects"
    };
    return descriptions[size] || "General waste disposal";
  };

  return (
    <div className="skip-selector">
      <header className="header">
        <div className="container">
          <div className="logo">
            <i className="fas fa-recycle"></i>
            <span>EcoSkip Hire</span>
          </div>
          <div className="user-info">
            <i className="fas fa-map-marker-alt"></i>
            <span>LE10 1SH • Garden Waste</span>
          </div>
        </div>
      </header>
      
      <div className="container">
        <div className="progress-container">
          <div className="progress-steps">
            <div className="progress-bar" style={{ width: '50%' }}></div>
            <div className="step completed">
              <div className="step-icon">
                <i className="fas fa-check"></i>
              </div>
              <div className="step-label">Postcode</div>
            </div>
            <div className="step completed">
              <div className="step-icon">
                <i className="fas fa-check"></i>
              </div>
              <div className="step-label">Waste Type</div>
            </div>
            <div className="step active">
              <div className="step-icon">3</div>
              <div className="step-label">Select Skip</div>
            </div>
            <div className="step">
              <div className="step-icon">4</div>
              <div className="step-label">Permit Check</div>
            </div>
            <div className="step">
              <div className="step-icon">5</div>
              <div className="step-label">Choose Date</div>
            </div>
            <div className="step">
              <div className="step-icon">6</div>
              <div className="step-label">Payment</div>
            </div>
          </div>
        </div>
        
        <div className="page-title">
          <h1>Choose Your Skip Size</h1>
          <p>Select the skip size that best suits your needs and requirements</p>
        </div>
        
        <div className="skips-container">
          {skips.map((skip) => (
            <div 
              key={skip.id} 
              className={`skip-card ${selectedSkip === skip.id ? 'selected' : ''}`}
              onClick={() => handleSelectSkip(skip.id)}
            >
              {skip.size === 8 && (
                <div className="card-badge">Best Value</div>
              )}
              {skip.size === 4 && (
                <div className="card-badge">Most Popular</div>
              )}
              
              <div className="card-header">
                <h3>{skip.size} Yard Skip</h3>
                <p>{getSizeDescription(skip.size)}</p>
              </div>
              
              <div className="card-image">
                <img src={getSkipImage(skip.size)} alt={`${skip.size} Yard Skip`} />
              </div>
              
              <div className="card-body">
                <div className="features">
                  <div className="feature">
                    <i className="fas fa-calendar"></i>
                    <span>Hire Period</span>
                    <div className="value">{skip.hire_period_days} days</div>
                  </div>
                  <div className="feature">
                    <i className="fas fa-weight-hanging"></i>
                    <span>Capacity</span>
                    <div className="value">{skip.size} Yards</div>
                  </div>
                  <div className="feature">
                    <i className="fas fa-road"></i>
                    <span>Road Permit</span>
                    <div className="value">
                      {skip.allowed_on_road ? 'Included' : 'Not included'}
                    </div>
                  </div>
                </div>
                
                <div className="price">
                  <div className="amount">£{skip.price_before_vat}</div>
                  <div className="vat">
                    + VAT £{(skip.price_before_vat * skip.vat / 100).toFixed(0)} • 
                    Total £{calculateTotalPrice(skip).toFixed(0)}
                  </div>
                </div>
                
                {!skip.allowed_on_road && (
                  <div className="warning">
                    <i className="fas fa-exclamation-triangle"></i>
                    <span>Not allowed on public roads. Requires private land.</span>
                  </div>
                )}
                
                <div className="btn-container">
                  <button 
                    className={`btn ${selectedSkip === skip.id ? 'btn-selected' : 'btn-primary'}`}
                  >
                    {selectedSkip === skip.id ? (
                      <>
                        <i className="fas fa-check"></i> Selected
                      </>
                    ) : (
                      "Select This Skip"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="size-comparison">
          <h2>Skip Size Comparison</h2>
          <div className="comparison-items">
            {skips.map((skip) => (
              <div 
                key={skip.id}
                className={`comparison-item ${selectedSkip === skip.id ? 'active' : ''}`}
                onClick={() => handleSelectSkip(skip.id)}
              >
                <div className="comparison-size">{skip.size} Yard</div>
                <div className="comparison-desc">{getSizeDescription(skip.size)}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="navigation">
          <button className="btn btn-nav btn-outline">
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <button 
            className="btn btn-nav btn-next"
            disabled={!selectedSkip}
          >
            Continue <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
      
      <footer>
        <div className="container">
          <p>© 2023 EcoSkip Hire • Environmentally responsible waste management</p>
          <p>Need help choosing? Call us at 0800 123 4567</p>
        </div>
      </footer>
    </div>
  );
};

export default SkipSelector;