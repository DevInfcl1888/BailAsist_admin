import React, { useState, useEffect, useRef } from 'react';
import countryData from './countrycode.json';
import styles from './CountrySelector.module.css';

const CountrySelector = ({ 
  value, 
  onChange, 
  phoneValue,
  onPhoneChange,
  placeholder = "(000) 000-0000" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const dropdownRef = useRef(null);
  const phoneInputRef = useRef(null);

  // Initialize selected country
  useEffect(() => {
    const country = countryData.find(c => {
      // Check if value starts with country dial code
      if (value && value.startsWith(c.dial_code)) {
        return true;
      }
      // Or if we can extract country code from phone value
      if (phoneValue && phoneValue.startsWith(c.dial_code)) {
        return true;
      }
      return c.code === "US"; // Default to US
    }) || countryData.find(c => c.code === "US") || countryData[0];
    
    setSelectedCountry(country);
  }, [value, phoneValue]);

  // Filter countries based on search
  const filteredCountries = countryData.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()) ||
    country.dial_code.includes(search) ||
    country.code.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle country selection
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    
    // If phone value exists, update it with new country code
    if (phoneValue) {
      const currentNumber = phoneValue.replace(/^\+\d+/, '');
      const newPhoneNumber = country.dial_code + currentNumber;
      onPhoneChange(newPhoneNumber);
    }
    
    setIsOpen(false);
    setSearch("");
    
    // Focus on phone input after selection
    setTimeout(() => {
      if (phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
    }, 100);
  };

  // Handle phone input change
  const handlePhoneInputChange = (e) => {
    let inputValue = e.target.value;
    
    // Remove non-digit characters
    let digits = inputValue.replace(/\D/g, '');
    
    // If input starts with country code, remove it
    if (selectedCountry && digits.startsWith(selectedCountry.dial_code.replace('+', ''))) {
      digits = digits.substring(selectedCountry.dial_code.length - 1);
    }
    
    // Format phone number
    let formattedNumber = '';
    if (digits.length > 0) {
      // Add country code
      formattedNumber = selectedCountry.dial_code + ' ';
      
      // Format as (XXX) XXX-XXXX
      if (digits.length <= 3) {
        formattedNumber += `(${digits}`;
      } else if (digits.length <= 6) {
        formattedNumber += `(${digits.substring(0, 3)}) ${digits.substring(3)}`;
      } else {
        formattedNumber += `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6, 10)}`;
      }
    }
    
    onPhoneChange(formattedNumber);
  };

  // Get display value for phone input
  const getDisplayPhoneValue = () => {
    if (!phoneValue && selectedCountry) {
      return `${selectedCountry.dial_code} ${placeholder}`;
    }
    return phoneValue || '';
  };

  return (
    <div className={styles.combinedPhoneInput} ref={dropdownRef}>
      {/* Combined Input Container */}
      <div className={styles.inputContainer}>
        {/* Country Selector Part */}
        <div 
          className={styles.countrySelector}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.flag}>{selectedCountry?.flag || '🇺🇸'}</span>
          <span className={styles.countryCode}>
            {selectedCountry?.dial_code || '+1'}
          </span>
          <span className={isOpen ? styles.arrowUp : styles.arrowDown}></span>
        </div>

        {/* Phone Input Part */}
        <div className={styles.phoneInputWrapper}>
          <input
            ref={phoneInputRef}
            type="tel"
            className={styles.phoneInput}
            value={getDisplayPhoneValue()}
            onChange={handlePhoneInputChange}
            onFocus={() => {
              // Auto-select the number part when focused
              if (phoneInputRef.current && selectedCountry) {
                const startPos = selectedCountry.dial_code.length + 1;
                phoneInputRef.current.setSelectionRange(startPos, phoneValue.length);
              }
            }}
            placeholder={placeholder}
          />
        </div>
      </div>

      {/* Dropdown for Countries */}
      {isOpen && (
        <div className={styles.dropdown}>
          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />
          </div>

          {/* Countries List */}
          <div className={styles.countriesList}>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className={`${styles.countryOption} ${selectedCountry?.code === country.code ? styles.selected : ''}`}
                  onClick={() => handleSelectCountry(country)}
                >
                  <span className={styles.optionFlag}>{country.flag}</span>
                  <span className={styles.optionName}>{country.name}</span>
                  <span className={styles.optionCode}>{country.dial_code}</span>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;