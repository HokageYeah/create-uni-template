const fs = require('fs');
const path = require('path');

/**
 * 测试构建配置和文件完整性
 */
function testBuild() {
  console.log('🔍 开始测试构建配置...\n');

  const checks = [
    {
      name: '检查package.json配置',
      test: () => {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
        return pkg.publisher && pkg.repository && pkg.main === './dist/extension.js';
      }
    },
    {
      name: '检查模板文件是否存在',
      test: () => {
        const templateDir = path.join(__dirname, 'src', 'template');
        const files = ['uni-template.vue', 'vue3-template.vue', 'vue2-template.vue'];
        return files.every(file => fs.existsSync(path.join(templateDir, file)));
      }
    },
    {
      name: '检查构建脚本',
      test: () => {
        return fs.existsSync('copy-templates.js') && fs.existsSync('esbuild.js');
      }
    },
    {
      name: '检查.vscodeignore配置',
      test: () => {
        const ignore = fs.readFileSync('.vscodeignore', 'utf-8');
        return ignore.includes('!template/**') && ignore.includes('!dist/**');
      }
    }
  ];

  let allPassed = true;
  checks.forEach(check => {
    try {
      const result = check.test();
      console.log(`${result ? '✅' : '❌'} ${check.name}`);
      if (!result) allPassed = false;
    } catch (error) {
      console.log(`❌ ${check.name}: ${error.message}`);
      allPassed = false;
    }
  });

  console.log('\n' + '='.repeat(50));
  console.log(`测试结果: ${allPassed ? '✅ 所有检查通过' : '❌ 存在问题需要修复'}`);
  
  if (allPassed) {
    console.log('\n📦 可以开始构建插件:');
    console.log('npm run package-vsce');
  }

  return allPassed;
}

// 执行测试
testBuild();
