mkdir jailed-worker-$1
cd jailed-worker-$1
mkdir -p bin lib64/x86_64-linux-gnu lib/x86_64-linux-gnu

unshare -n -m ./program.out