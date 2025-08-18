import * as vscode from 'vscode';
import { TemplateOption, TemplateType } from './templateManager';

/**
 * 用户界面类
 * 负责处理与用户的交互
 */
export class UserInterface {
  /**
   * 提示用户输入组件名称
   * @returns 返回用户输入的组件名称或undefined（用户取消）
   */
  public async getComponentName(): Promise<string | undefined> {
    return vscode.window.showInputBox({
      placeHolder: '请输入组件名称',
      prompt: '输入组件名称，将用于文件名和组件name属性',
      validateInput: (input) => {
        if (!input || input.trim() === '') {
          return '组件名称不能为空';
        }
        return null;
      }
    });
  }

  /**
   * 提示用户选择模板类型
   * @param templateOptions 模板选项列表
   * @returns 返回用户选择的模板类型或undefined（用户取消）
   */
  public async selectTemplateType(templateOptions: TemplateOption[]): Promise<TemplateType | undefined> {
    const quickPickOptions = templateOptions.map(option => ({
      label: option.label,
      description: option.description,
      detail: `创建 ${option.type} 类型的组件模板`,
      option
    }));

    const selected = await vscode.window.showQuickPick(quickPickOptions, {
      placeHolder: '请选择模板类型',
      matchOnDescription: true,
      matchOnDetail: true
    });

    return selected?.option.type;
  }

  /**
   * 询问用户是否使用指定的保存路径
   * @param path 保存路径
   * @returns 是否使用该路径
   */
  public async confirmSavePath(path: string): Promise<boolean> {
    const result = await vscode.window.showQuickPick(
      ['是, 使用此路径', '否, 选择其他路径'], 
      { 
        placeHolder: `是否使用当前目录作为保存位置? ${path}`
      }
    );
    
    return result === '是, 使用此路径';
  }

  /**
   * 提示用户选择保存路径
   * @returns 返回用户选择的保存路径或undefined（用户取消）
   */
  public async selectSavePath(): Promise<string | undefined> {
    // 获取工作区文件夹
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      throw new Error('没有打开的工作区文件夹');
    }
    
    // 选择文件夹
    const uri = await vscode.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: '选择此文件夹',
      defaultUri: workspaceFolders[0].uri
    });
    
    return uri?.[0]?.fsPath;
  }

  /**
   * 显示成功消息
   * @param componentName 组件名称
   */
  public showSuccessMessage(componentName: string): void {
    vscode.window.showInformationMessage(`组件 ${componentName}.vue 已成功创建`);
  }

  /**
   * 显示错误消息
   * @param message 错误消息
   */
  public showErrorMessage(message: string): void {
    vscode.window.showErrorMessage(`创建组件失败: ${message}`);
  }

  /**
   * 打开新创建的文件
   * @param filePath 文件路径
   */
  public async openFile(filePath: string): Promise<void> {
    try {
      const document = await vscode.workspace.openTextDocument(filePath);
      await vscode.window.showTextDocument(document);
    } catch (error) {
      throw new Error(`无法打开文件: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} 