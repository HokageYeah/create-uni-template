// VS Code扩展API
import * as vscode from 'vscode';
import { TemplateManager } from './code/templateManager';
import { UserInterface } from './code/userInterface';
import { ComponentGenerator } from './code/componentGenerator';

/**
 * 激活扩展时调用此方法
 * @param context 扩展上下文
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('扩展 "create-uni-template" 已激活!');

  // 注册命令
  const disposable = vscode.commands.registerCommand(
    'create-uni-template.createComponent', 
    async (uri?: vscode.Uri) => {
      // 创建模板管理器
      const templateManager = new TemplateManager(context);
      console.log('create-uni-template.createComponent------uri',uri);
	  console.log('create-uni-template.createComponent------uri.fsPath',uri?.fsPath);
      // 创建用户界面
      const ui = new UserInterface();
      
      // 创建组件生成器
      const generator = new ComponentGenerator(templateManager, ui);
      
      // 检查是否通过右键菜单调用（uri参数来自资源管理器上下文菜单）
      let initialPath: string | undefined;
      if (uri && uri.fsPath) {
        // 从uri获取路径（这是从资源管理器上下文菜单点击时传递的）
        initialPath = uri.fsPath;
      }
      
      // 执行组件生成流程，传递初始路径（如果有）
      await generator.generate(initialPath);
    }
  );

  context.subscriptions.push(disposable);
}

/**
 * 扩展被停用时调用此方法
 */
export function deactivate() {}
