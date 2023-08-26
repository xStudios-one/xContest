// Creating a jail directory, moving the program and input file to the jail directory, executing the
// program in the jail directory, checking the output, and moving the output to the parent directory.
#? create jail directory
mkdir jailed-worker-$1
cd jailed-worker-$1
mkdir -p bin lib64/x86_64-linux-gnu lib/x86_64-linux-gnu

mv ../$1.out ./program.out
mv ../$1.i ./test.i

#? execute jail command
timeout $2 unshare -n -m "./program.out" < test.i > test.o

#? check out
STATUS=$?

if test $STATUS -eq 124
then
	echo "TIMEOUT-$1" > test.o
fi

#? clean up and move outout to the parent directory
mv ./test.o ../out/$1.o
cd ..
rm -rf ./jailed-worker-$1/