Python
===

## 环境问题

- pytorch1.4找不到包

  - `-f https://download.pytorch.org/whl/torch_stable.html`

- [缺少Microsoft Visual C++ 14.0 is required.](https://blog.csdn.net/qzzzxiaosheng/article/details/125119006)
- `conda install libpython m2w64-toolchain -c msys2`
  - `conda install -c conda-forge pycocotools`

- legacy-install-failure× Encountered error while trying to install

  - 采用手动下载mxnet文件，对应目录下`F:\Download>pip install mxnet-1.9.0+mkl-cp39-cp39-win_amd64.whl`
  - 比如pytorch1.4的whlhttps://pytorch-geometric.com/whl/torch-1.4.0%2Bcu101.html
