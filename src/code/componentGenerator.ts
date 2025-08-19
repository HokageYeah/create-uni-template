import * as path from 'path';
import { TemplateManager, TemplateType } from './templateManager';
import { UserInterface } from './userInterface';
import * as fs from 'fs';

/**
 * 组件生成器类
 * 负责协调整个组件生成流程
 */
export class ComponentGenerator {
  private templateManager: TemplateManager;
  private ui: UserInterface;

  /**
   * 构造函数
   * @param templateManager 模板管理器实例
   * @param ui 用户界面实例
   */
  constructor(templateManager: TemplateManager, ui: UserInterface) {
    this.templateManager = templateManager;
    this.ui = ui;
  }

  /**
   * 执行组件生成流程
   * @param initialPath 初始目录路径（可选）
   * @returns 是否成功生成组件
   */
  public async generate(initialPath?: string): Promise<boolean> {
    try {
      // 1. 获取组件名称
      const componentName = await this.ui.getComponentName();
      if (!componentName) {
        return false; // 用户取消
      }

      // 2. 获取模板类型
      const templateOptions = this.templateManager.getTemplateOptions();
      const templateType = await this.ui.selectTemplateType(templateOptions);
      if (!templateType) {
        return false; // 用户取消
      }

      // 3. 获取保存路径
      let savePath: string | undefined;
      
      if (initialPath) {
        // 判断路径是否是文件夹
        const isFolder = fs.statSync(initialPath).isDirectory();
        console.log('generate---isFolder---',isFolder);
        let newInitialPath = initialPath;
        if (!isFolder) {
            newInitialPath = path.dirname(initialPath);
        }
        console.log('generate---newInitialPath---',newInitialPath);
        // 如果有初始路径，询问是否使用
        const useInitialPath = await this.ui.confirmSavePath(newInitialPath);
        savePath = useInitialPath ? newInitialPath : await this.ui.selectSavePath();
      } else {
        // 没有初始路径，直接选择
        savePath = await this.ui.selectSavePath();
      }
      
      if (!savePath) {
        return false; // 用户取消
      }

      // 4. 生成组件文件
      await this.generateComponentFile(componentName, templateType, savePath);
      
      return true;
    } catch (error) {
      this.ui.showErrorMessage(error instanceof Error ? error.message : String(error));
      return false;
    }
  }

  /**
   * 生成组件文件
   * @param componentName 组件名称
   * @param templateType 模板类型
   * @param savePath 保存路径
   */
  private async generateComponentFile(
    componentName: string,
    templateType: TemplateType,
    savePath: string
  ): Promise<void> {
    // 读取模板内容
    const templateContent = this.templateManager.readTemplateContent(templateType);
    console.log('generateComponentFile---templateContent---',templateContent);
    // 处理模板内容（替换变量）
    const processedContent = this.templateManager.processTemplate(templateContent, componentName);
    console.log('generateComponentFile---processedContent---',processedContent);
    // 目标文件路径
    const targetFile = path.join(savePath, `${componentName}.vue`);
        
    // 写入文件
    this.templateManager.writeComponentFile(processedContent, targetFile);
    
    // 打开新创建的文件
    await this.ui.openFile(targetFile);
    
    // 显示成功消息
    this.ui.showSuccessMessage(componentName);
  }
} 