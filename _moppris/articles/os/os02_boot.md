Created: 2016-06-10  
Updated: 2016-06-10

# 02. ブートする
***



## 目標
Rustで書いたmain関数をブートする。
***



## どうやってOSが実行されるのか
ブートとは起動という意味の英語です。  
なので、PCの電源ボタンを押して、OSを起動させることをOSをブートさせるといいます。
ここでは、ブートについて見ていきます。

一般的なPCで電源を押して、OSが起動するまでの流れを以下に示します。  
電源ON -> BIOS起動 -> BIOSによるPOST -> ブートローダ起動 -> OS起動  
TODO: 図

BIOSはバイオスと呼ばれ、Basic Input/Output Systemの略称です。
はるか昔に、様々なデバイスを抽象化し、プログラムからうまいこと制御するために生まれたそうです。
しかし、コンピュータの普及に伴い、BIOSだけであらゆるデバイスに対応するのは不可能となったので、OSがデバイスドライバを用いて直接デバイスを制御するのが昨今のやり方です。
BIOSが行うのは、主にハードウェアの初期化とブートローダの読み込みです。
***



## ブートローダ
ブートローダ(Boot Loader)、もしくはブートストラップローダ(Bootstrap Loader)は、OSを起動するためのプログラムです。
***



## Multiboot specification 2
Multiboot specification\[1\]、面倒なので日本語でマルチブート仕様とします。
[2016-06-10時点で最新の仕様](http://git.savannah.gnu.org/cgit/grub.git/commit/?h=multiboot2&id=bb61b2b8010a14f09905522b053099996a1833d1)をPDFにしました。
* [Multiboot specification 2 PDF](/articles/os/multiboot2.pdf)

PDF化しただけで、一切の変更をしていません。
また、この仕様はGPL3でライセンスされています。  
リポジトリのブランチ名はmultiboot2なのに、なぜかPDF上では1.6になっています。
不思議ですが細かいことは気にしないで行きましょう。

仕様書より、マルチブート仕様の目的を引用します。
>原文: Basically, it specifies an interface between a boot loader and a operating system, such that any complying boot loader should be able to load any complying operating system.  
>訳:基本的に、仕様に準拠したブートローダが仕様に準拠したOSを読み込めるように、ブートローダとOS間のインターフェースを策定する。

様々なOSが様々な独自ブートローダを持っていて、複数のOSを共存させるのが難しい、多段ブートが悪夢のようになる(原文にそうあります)ということがマルチブート仕様策定の背景にあるようです。  
実際に、LinuxであればLILO(LInux LOader)、WindowsであればWindows Boot Managerなどがブートローダとして存在します。(ちなみに、Linuxはマルチブート仕様に対応しています。)
ブートローダはOSが実行に必要な情報(メモリ情報など)を集めて、OSに渡しますが、これが、それぞれどういうふうに渡すかが異なるため、LILOでWindowsを起動することは出来ません。  
うろ覚えですが、grubは、Linuxを起動したいときはLILOを起動、Windowsを起動したいときはWindows Boot Managerを起動、としていたはずです。  
これを多段ブートや、chainingなどといいます。このとき、ブートローダはgrubから起動されたとは気づかずに、BIOSから起動されたようになるため、複数のOSを起動できるわけです。
しかし、あまりエレガントな方法とは言い難いですよね。
grubの中の人も大変そうです。  

しかし、grubはマルチブート仕様に対応しています。
なので、ここではgrubをブートローダとして使用します。
***



### References
* \[1\]. Grub2 repository, [http://git.savannah.gnu.org/cgit/grub.git/tree/doc?h=multiboot2](http://git.savannah.gnu.org/cgit/grub.git/tree/doc?h=multiboot2)
* \[2\]. Multiboot, [http://wiki.osdev.org/Multiboot](http://wiki.osdev.org/Multiboot)
* \[3\]. Tips  マルチブート仕様, [http://softwaretechnique.jp/OS_Development/Tips/multi_boot.html](http://softwaretechnique.jp/OS_Development/Tips/multi_boot.html)
    * 参考になるので載せましたがmultiboot specification 1なので気をつけてください。
***
