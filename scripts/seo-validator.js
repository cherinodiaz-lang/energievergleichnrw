#!/usr/bin/env node

/**
 * SEO Validation Script
 * Validates critical SEO elements in built HTML files
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const DIST_DIR = path.join(__dirname, '../dist');

function validateSEO() {
  console.log('🔍 Starting SEO validation...');
  console.log('=' .repeat(50));
  
  const htmlFiles = glob.sync(`${DIST_DIR}/**/*.html`);
  let errors = [];
  let warnings = [];
  
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(DIST_DIR, file);
    
    // Check for title tag
    if (!content.includes('<title>')) {
      errors.push(`${relativePath}: Missing <title> tag`);
    }
    
    // Check for meta description
    if (!content.includes('name="description"')) {
      errors.push(`${relativePath}: Missing meta description`);
    }
    
    // Check for canonical URL
    if (!content.includes('rel="canonical"')) {
      warnings.push(`${relativePath}: Missing canonical URL`);
    }
    
    // Check for Open Graph tags
    if (!content.includes('property="og:title"')) {
      warnings.push(`${relativePath}: Missing og:title`);
    }
    
    // Check for structured data
    if (!content.includes('application/ld+json')) {
      warnings.push(`${relativePath}: Missing structured data`);
    }
  });
  
  console.log(`📄 Checked ${htmlFiles.length} HTML files`);
  console.log('=' .repeat(50));
  
  if (errors.length > 0) {
    console.error(`\n❌ ${errors.length} SEO ERRORS:`);
    errors.forEach(err => console.error(`  - ${err}`));
  }
  
  if (warnings.length > 0) {
    console.warn(`\n⚠️  ${warnings.length} SEO WARNINGS:`);
    warnings.forEach(warn => console.warn(`  - ${warn}`));
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('\n✅ All SEO checks passed!');
  }
  
  console.log('=' .repeat(50));
  
  // Exit with error code if critical errors found
  if (errors.length > 0) {
    process.exit(1);
  }
}

validateSEO();
