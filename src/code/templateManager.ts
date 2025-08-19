import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 模板类型定义
 */
export type TemplateType = 'uni' | 'vue3' | 'vue2';

/**
 * 模板配置项
 */
export interface TemplateOption {
  label: string;
  type: TemplateType;
  description?: string;
}

/**
 * 模板管理器类
 * 负责模板的读取、处理和生成
 */
export class TemplateManager {
  private extensionPath: string;

  /**
   * 构造函数
   * @param context 扩展上下文
   */
  constructor(context: vscode.ExtensionContext) {
    console.log('TemplateManager---构造函数---');
    console.log('TemplateManager---context---', context);
    this.extensionPath = context.extensionPath;
  }

  /**
   * 获取所有可用的模板选项
   * @returns 模板选项列表
   */
  public getTemplateOptions(): TemplateOption[] {
    return [
      { label: 'uni-app 模板', type: 'uni', description: 'uni-app Vue 组件模板' },
      { label: 'Vue3 模板', type: 'vue3', description: 'Vue3 组件模板 (使用 Composition API)' },
      { label: 'Vue2 模板', type: 'vue2', description: 'Vue2 组件模板 (使用 Options API)' }
    ];
  }

  /**
   * 读取模板文件内容
   * @param templateType 模板类型
   * @returns 模板文件内容
   */
  public readTemplateContent(templateType: TemplateType): string {
    // 尝试多个可能的模板文件路径
    const possiblePaths = [
      // 打包后的路径
      path.join(this.extensionPath, 'template', `${templateType}-template.vue`),
      // 开发环境路径
      path.join(this.extensionPath, 'src', 'template', `${templateType}-template.vue`),
      // dist目录路径
      path.join(this.extensionPath, 'dist', 'template', `${templateType}-template.vue`)
    ];
    console.log('readTemplateContent---possiblePaths---',possiblePaths);
    for (const templateFile of possiblePaths) {
      try {
        if (fs.existsSync(templateFile)) {
          return fs.readFileSync(templateFile, 'utf-8');
        }
      } catch (error) {
        // 继续尝试下一个路径
        continue;
      }
    }
    
    throw new Error(`无法读取模板文件: ${templateType}-template.vue。请确保模板文件存在。`);
  }

  /**
   * 替换模板中的变量
   * @param templateContent 模板内容
   * @param componentName 组件名称
   * @returns 替换变量后的内容
   */
  public processTemplate(templateContent: string, componentName: string): string {
    // 替换组件名称
    return templateContent.replace(/name: ['"]name['"]/, `name: '${componentName}'`);
    
    // 可以扩展更多的替换逻辑，如替换其他变量
  }

  /**
   * 将处理后的内容写入文件
   * @param content 文件内容
   * @param filePath 文件路径
   */
  public writeComponentFile(content: string, filePath: string): void {
    try {
      // 确保目录存在
      const directory = path.dirname(filePath);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      
      fs.writeFileSync(filePath, content, 'utf-8');
    } catch (error) {
      throw new Error(`写入文件失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} 