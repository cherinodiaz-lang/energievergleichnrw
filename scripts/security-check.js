#!/usr/bin/env node

/**
 * Security Check Script
 * Checks for known vulnerabilities and outdated packages
 */

const { execSync } = require('child_process');
const fs = require('fs');

function runSecurityCheck() {
  console.log('🔒 Running security checks...');
  console.log('='.repeat(50));
  
  try {
    // Run npm audit
    console.log('\n📊 NPM Audit Report:');
    const auditResult = execSync('npm audit --json', { encoding: 'utf8' });
    const audit = JSON.parse(auditResult);
    
    console.log(`\n📈 Vulnerabilities Summary:`);
    console.log(`  Low: ${audit.metadata.vulnerabilities.low || 0}`);
    console.log(`  Moderate: ${audit.metadata.vulnerabilities.moderate || 0}`);
    console.log(`  High: ${audit.metadata.vulnerabilities.high || 0}`);
    console.log(`  Critical: ${audit.metadata.vulnerabilities.critical || 0}`);
    
    const total = Object.values(audit.metadata.vulnerabilities).reduce((a, b) => a + b, 0);
    
    if (total === 0) {
      console.log('\n✅ No vulnerabilities found!');
    } else {
      console.log(`\n⚠️  Total vulnerabilities: ${total}`);
      console.log('\n💡 Run "npm audit fix" to fix automatically');
      console.log('💡 Run "npm audit fix --force" for breaking changes');
    }
    
    // Check for outdated packages
    console.log('\n📦 Checking for outdated packages...');
    try {
      execSync('npm outdated', { stdio: 'inherit' });
    } catch (error) {
      // npm outdated returns non-zero exit code when packages are outdated
      console.log('\n💡 Run "npm update" to update packages');
    }
    
  } catch (error) {
    console.error('\n❌ Error running security check:', error.message);
    process.exit(1);
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ Security check complete!');
}

runSecurityCheck();
