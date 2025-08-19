const fs = require('fs');
const path = require('path');

/**
 * 复制模板文件到构建目录
 */
function copyTemplates() {
  const sourceDir = path.join(__dirname, 'src', 'template');
  const targetDir = path.join(__dirname, 'template');

  console.log('开始复制模板文件...');
  console.log(`源目录: ${sourceDir}`);
  console.log(`目标目录: ${targetDir}`);

  // 确保目标目录存在
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 读取源目录中的所有文件
  const files = fs.readdirSync(sourceDir);

  files.forEach(file => {
    // 只复制.vue文件
    if (path.extname(file) === '.vue') {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      try {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✓ 已复制: ${file}`);
      } catch (error) {
        console.error(`✗ 复制失败 ${file}:`, error.message);
      }
    }
  });

  console.log('模板文件复制完成!');
}

// 执行复制
copyTemplates();
