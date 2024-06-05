# -*- coding: utf-8 -*-
import subprocess
import shutil
import sys
import os
import argparse  # 导入argparse模块
print("---开始运行")
# 更新并重启应用
# 用来装载参数的容器
parser = argparse.ArgumentParser(description='代码备份更新回滚')
# 脚本参数定义

parser.add_argument('-d', '--source_folder', type=str,
                    required=True, help='源码目录,后缀不加/')
parser.add_argument('-t', '--target_folder', type=str,
                    required=True, help='部署目录,后缀不加/')
args = parser.parse_args()
# # 指定目标文件夹、另一个目录和要保留的文件夹列表
source_folder = args.source_folder
target_folder = args.target_folder
# source_folder = 'a'
# target_folder = 'a'
bak_folder = target_folder+'/bak'
file_to_copy = ["assets",  "static", "index.html"]

# print(file_to_keep)
# 创建备份文件夹
if not os.path.exists(bak_folder):
    os.mkdir(bak_folder)


def update_and_run_project(target_folder, source_folder, file_to_copy):
    """
        根据文件copy。

        参数:
            target_folder: 目标目录。
            source_folder: 源目录。
            file_to_copy: 进行覆盖或者备份的目录列表。
        返回值:
            0 报错 1 正常
    """
    try:
        # 删除目标文件夹中除了指定文件夹之外的所有文件
        for item in os.listdir(target_folder):
            item_path = os.path.join(target_folder, item)
            if item in file_to_copy and os.path.isdir(item_path):
                shutil.rmtree(item_path)
            elif item in file_to_copy and os.path.isfile(item_path):
                os.remove(item_path)

        # 将另一个目录下的文件覆盖到当前目录
        for item in os.listdir(source_folder):
            source_item_path = os.path.join(source_folder, item)
            target_item_path = os.path.join(target_folder, item)
            if os.path.isdir(source_item_path) and item in file_to_copy:
                shutil.copytree(source_item_path,
                                target_item_path)
            elif os.path.isfile(source_item_path) and item in file_to_copy:
                shutil.copy2(source_item_path, target_item_path)
        return 1
    except Exception as e:
        print("发生错误：%s" % e)
        return 0


def run_start_cmd(target_folder, cmd):
    """
        运行服务器命令。

        参数:
            target_folder: 目标目录。
            cmd: 命令 数组。
        返回值:
            0 报错 1 正常
    """
    process = subprocess.Popen(
        cmd, cwd=target_folder, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    # 获取标准输出和标准错误
    stdout, stderr = process.communicate()
    # 打印标准输出和标准错误
    print("标准输出：", stdout)
    print("标准错误：", stderr)
    # 判断是否成功
    if process.returncode == 0:
        return 1
    else:
        return 0


# 调用函数更新代码
# 备份代码
code = update_and_run_project(bak_folder, target_folder, file_to_copy)
if code == 0:
    sys.exit("备份失败！！！")
print("------备份代码成功")
# 更新代码
code = update_and_run_project(target_folder, source_folder, file_to_copy)
print("------更新代码成功")
# code = 0
# 报错恢复代码
if code == 0:
    code = update_and_run_project(target_folder, bak_folder, file_to_copy)
    if code == 0:
        sys.exit("版本回退失败！！！")
    print("------版本回退成功", code)
