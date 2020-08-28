<!--
 * @Author: your name
 * @Date: 2020-08-28 09:09:23
 * @LastEditTime: 2020-08-28 09:10:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Dungeon-Story\CombatSystemIntrodunction.md
-->
# Combat System Introduction

## Hero Attack Process Flow

~~~mermaid
graph LR
    compute_values --> before_attack --> during_attack --> after_attack
~~~
## Sub Processes In Each Attack Process

~~~ mermaid
graph LR
	compute_hero_basic_values --> call_tool_effect_process --> call_hero_buff_effect_process --> call_enemy_anti_buff_effect_process
~~~

## Effect Work Flow

tool effect process, buff effect process, and enemy anti buff effect process are all a kind of **Effect Process**

And each Effect Process can has one or several effect targets below :

+ none (like some additional effect with  )

## Buff Structure 

~~~mermaid
graph LR
	BuffObject --> compute_values_process
	BuffObject --> before_attack_process
	BuffObject --> during_attack
	BuffObject --> after_attack_process
~~~



## Combat Data Flow









