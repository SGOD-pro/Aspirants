import java.util.Scanner;
import java.util.ArrayList;
import java.util.Collections;
class Main2 {
    public static void print(int arr[][]) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr.length; j++) {
                System.out.print(arr[i][j] + "\t");
            }
            System.out.println();
        }
    }

    public static void input(int arr[][]) {
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr.length; j++) {
                arr[i][j] = sc.nextInt();
            }
        }
        sc.close();
    }

    public static void RemoveDuplicatesWords(String word) {
        ArrayList<Character> list = new ArrayList<Character>();

        for (int i = 0; i < word.length(); i++) {
            if (!list.contains(word.charAt(i))) {
                list.add(word.charAt(i));
            }
        }
        String result = "";
        for (int i = 0; i < list.size(); i++) {
            result += list.get(i);
        }
        System.out.println(result);
    }

    public static void chocolate() {
        ArrayList<Integer> list = new ArrayList<Integer>();

        int[] arr =  {7, 3, 2, 4, 9, 12, 56} ;

        for (int i = 0; i < arr.length; i++) {

            list.add(arr[i]);

        }
        int m=3;
        Collections.sort(list);
        int maxdiff=list.get(list.size()-1);
        for (int i = 0; i < list.size()-m+1; i++) {
            int t=list.get(i+m-1)-list.get(i);
            if (t<maxdiff) {
                maxdiff=t;
            }
        }
        System.out.println(maxdiff);
    }

    public static void main(String args[]) {
        // int arr[][] = { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 } };
        // int arr2[][] = { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 } };
        // input(arr);
        // input(arr2);

        // int result[][] = new int[3][3];
        // for (int i = 0; i < arr2.length; i++) {
        // for (int j = 0; j < arr2.length; j++) {
        // int t = 0;
        // for (int j2 = 0; j2 < arr2.length; j2++) {
        // t += arr[i][j2] * arr2[j2][j];
        // }
        // result[i][j] = t;
        // }
        // }

        // int sum = 0;
        // for (int i = 0; i < result.length; i++) {
        // sum += result[i][result.length - 1 - i];
        // }

        // System.out.println(sum);

        // RemoveDuplicatesWords("aabbcfghiijkllkjlkj");
        chocolate();
    }
}